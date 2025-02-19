"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from "lucide-react"
import Image from "next/image"

interface PaymentType {
  _id: string
  name: string
  thumbnail?: string
}

interface QRCode {
  _id: string
  name: string
  image: string
  paymentPlatform: string
}

export default function Dashboard() {
  const [name, setName] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])
  const [qrCodes, setQrCodes] = useState<QRCode[]>([])
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [editingQr, setEditingQr] = useState<QRCode | null>(null)

  useEffect(() => {
    fetchPaymentTypes()
    if (selectedPaymentType) {
      fetchQrCodes(selectedPaymentType)
    }
  }, [selectedPaymentType])

  const fetchPaymentTypes = async () => {
    const response = await fetch("/api/paymentTypes")
    const data = await response.json()
    if (data.platformTypes) {
      setPaymentTypes(data.platformTypes)
    } else {
      console.log(data.message)
    }
  }

  const fetchQrCodes = async (paymentMethod: string) => {
    if (!paymentMethod) return;
    
    try {
        const response = await fetch(`/api/paymentQrs?paymentTypeName=${paymentMethod}`);
        const data = await response.json();

        if (data.qrCodes) {
            setQrCodes(data.qrCodes);
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.error("Error fetching QR Codes:", error);
    }
};


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const handleAddPaymentType = async () => {
    const formData = new FormData()
    formData.append("name", name)
    if (image) {
      formData.append("image", image)
    }

    const response = await fetch("/api/paymentTypes", {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
    setPaymentTypes([...paymentTypes, data.data])
    closeModal()
  }

  const handleAddQrCode = async () => {
    if (!selectedPaymentType) {
      alert("Please select a payment platform.")
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("paymentPlatform", selectedPaymentType)
    if (image) {
      formData.append("image", image)
    }

    const url = editingQr ? `/api/paymentQrs/${editingQr._id}` : "/api/paymentQrs"
    const method = editingQr ? "PUT" : "POST"

    const response = await fetch(url, {
      method: method,
      body: formData,
    })

    const data = await response.json()
    if (editingQr) {
      setQrCodes(qrCodes.map((qr) => (qr._id === editingQr._id ? data.data : qr)))
    } else {
      setQrCodes([...qrCodes, data.data])
    }
    closeQrModal()
  }

  const handleDeleteQrCode = async (id: string) => {
    const response = await fetch(`/api/paymentQrs/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setQrCodes(qrCodes.filter((qr) => qr._id !== id))
    } else {
      console.log("Failed to delete QR code")
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
    setName("")
    setImage(null)
    setImagePreview(null)
  }

  const openQrModal = (qr?: QRCode) => {
    setIsQrModalOpen(true)
    if (qr) {
      setEditingQr(qr)
      setName(qr.name)
      setSelectedPaymentType(qr.paymentPlatform)
      setImagePreview(qr.image)
    } else {
      setEditingQr(null)
      setName("")
      setImage(null)
      setImagePreview(null)
      setSelectedPaymentType(null)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setName("")
    setImage(null)
    setImagePreview(null)
  }

  const closeQrModal = () => {
    setIsQrModalOpen(false)
    setName("")
    setImage(null)
    setImagePreview(null)
    setSelectedPaymentType(null)
    setEditingQr(null)
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="space-x-2">
          <Button onClick={openModal} variant="default">
            + Add Payment Method
          </Button>
          <Button onClick={() => openQrModal()} variant="default">
            + Add QR Code
          </Button>
        </div>
      </div>

      {/* Payment Types */}
      <div className="mb-8">
  <h2 className="text-xl font-semibold mb-2">Payment Methods</h2>
  <div className="flex flex-wrap gap-2">
    {paymentTypes.map((type) => (
      <Button
        key={type._id}
        onClick={() => setSelectedPaymentType(type.name)}
        variant={selectedPaymentType === type.name ? "default" : "outline"}
      >
        <img src={type.thumbnail} alt="" style={{ height: "25px", width: "auto" }} />
      </Button>
    ))}
  </div>
</div>

      {/* QR Codes Table */}
      {selectedPaymentType && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">QR Codes for {selectedPaymentType}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>QR Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qrCodes
                .filter((qr) => qr.paymentPlatform === selectedPaymentType)
                .map((qr) => (
                  <TableRow key={qr._id}>
                    <TableCell>
                      <Image
                        src={qr.image || "/placeholder.svg"}
                        alt={qr.name}
                        width={48}
                        height={48}
                        className="rounded"
                      />
                    </TableCell>
                    <TableCell>{qr.name}</TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={() => openQrModal(qr)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" onClick={() => handleDeleteQrCode(qr._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Payment Method Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input id="image" type="file" onChange={handleImageChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleAddPaymentType}>Upload Payment Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingQr ? "Edit" : "Add"} QR Code</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="qrName" className="text-right">
                QR Name
              </Label>
              <Input id="qrName" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Payment Platform</Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                {paymentTypes.map((type) => (
                  <Button
                    key={type._id}
                    onClick={() => setSelectedPaymentType(type.name)}
                    variant={selectedPaymentType === type.name ? "default" : "outline"}
                  >
                    {type.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="qrImage" className="text-right">
                QR Image
              </Label>
              <Input id="qrImage" type="file" onChange={handleImageChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeQrModal}>
              Cancel
            </Button>
            <Button onClick={handleAddQrCode}>{editingQr ? "Update" : "Upload"} QR Code</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

