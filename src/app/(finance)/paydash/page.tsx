"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

interface PaymentType {
  _id: string;
  name: string;
  thumbnail?: string;
}

interface QRCode {
  _id: string;
  name: string;
  image: string;
  paymentPlatform: string;
}

export default function Dashboard() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [editingQr, setEditingQr] = useState<QRCode | null>(null);
  const [editingPaymentType, setEditingPaymentType] = useState<PaymentType | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  useEffect(() => {
    fetchPaymentTypes();
    if (selectedPaymentType) {
      fetchQrCodes(selectedPaymentType);
    }
  }, [selectedPaymentType]);

  const fetchPaymentTypes = async () => {
    const response = await fetch("/api/paymentTypes");
    const data = await response.json();
    if (data.platformTypes) {
      setPaymentTypes(data.platformTypes);
    }
  };

  const fetchQrCodes = async (paymentMethod: string) => {
    if (!paymentMethod) return;
    const response = await fetch(`/api/paymentQrs?paymentTypeName=${paymentMethod}`);
    const data = await response.json();
    if (data.qrCodes) {
      setQrCodes(data.qrCodes);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleAddOrEditPaymentType = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    const url = editingPaymentType ? `/api/paymentTypes?id=${editingPaymentType._id}` : "/api/paymentTypes";
    const method = editingPaymentType ? "PUT" : "POST";

    const response = await fetch(url, { method, body: formData });
    const data = await response.json();

    if (editingPaymentType) {
      setPaymentTypes(paymentTypes.map((type) => (type._id === editingPaymentType._id ? data.data : type)));
    } else {
      setPaymentTypes([...paymentTypes, data.data]);
    }

    closeModal();
  };

  const handleAddQrCode = async () => {
    if (!selectedPlatform) {
      alert("Please select a payment platform.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("paymentPlatform", selectedPlatform);
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("/api/paymentQrs", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setQrCodes([...qrCodes, data.data]);
    closeQrModal();
  };

  const handleDeletePaymentType = async (id: string) => {
    const response = await fetch(`/api/paymentTypes?id=${id}`, { method: "DELETE" });
    if (response.ok) {
      setPaymentTypes(paymentTypes.filter((type) => type._id !== id));
    }
  };

  const openModal = (paymentType?: PaymentType) => {
    setIsModalOpen(true);
    if (paymentType) {
      setEditingPaymentType(paymentType);
      setName(paymentType.name);
      setImagePreview(paymentType.thumbnail || null);
    } else {
      setEditingPaymentType(null);
      setName("");
      setImage(null);
      setImagePreview(null);
    }
  };

  const openQrModal = () => {
    setIsQrModalOpen(true);
    setName("");
    setImage(null);
    setImagePreview(null);
    setSelectedPlatform("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setName("");
    setImage(null);
    setImagePreview(null);
    setEditingPaymentType(null);
  };

  const closeQrModal = () => {
    setIsQrModalOpen(false);
    setName("");
    setImage(null);
    setImagePreview(null);
    setSelectedPlatform("");
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="space-x-2">
          <Button onClick={() => openModal()} variant="default">
            + Add Payment Method
          </Button>
          <Button onClick={openQrModal} variant="default">
            + Add QR Code
          </Button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Payment Methods</h2>
        <div className="flex flex-wrap gap-2">
          {paymentTypes.map((type) => (
            <div key={type._id} className="flex items-center space-x-2">
              <Button
                onClick={() => setSelectedPaymentType(type.name)}
                variant={selectedPaymentType === type.name ? "default" : "outline"}
              >
                <img src={type.thumbnail || "/placeholder.svg"} alt={type.name} style={{ height: "25px", width: "auto" }} />
              </Button>
              <Button variant="ghost" onClick={() => openModal(type)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" onClick={() => handleDeletePaymentType(type._id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPaymentType ? "Edit" : "Add"} Payment Method</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" onChange={handleImageChange} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button onClick={handleAddOrEditPaymentType}>
              {editingPaymentType ? "Update" : "Upload"} Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add QR Code</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="qrName">QR Name</Label>
            <Input id="qrName" value={name} onChange={(e) => setName(e.target.value)} required />
            <Label>Select Payment Platform</Label>
            <div className="flex flex-wrap gap-2">
              {paymentTypes.map((type) => (
                <Button
                  key={type._id}
                  onClick={() => setSelectedPlatform(type.name)}
                  variant={selectedPlatform === type.name ? "default" : "outline"}
                >
                  {type.name}
                </Button>
              ))}
            </div>
            <Label htmlFor="qrImage">Image</Label>
            <Input id="qrImage" type="file" onChange={handleImageChange} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeQrModal}>Cancel</Button>
            <Button onClick={handleAddQrCode}>Upload QR Code</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR Codes Section */}
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
              {qrCodes.map((qr) => (
                <TableRow key={qr._id}>
                  <TableCell>
                    <Image src={qr.image || "/placeholder.svg"} alt={qr.name} width={48} height={48} className="rounded" />
                  </TableCell>
                  <TableCell>{qr.name}</TableCell>
                  <TableCell>
                    <Button variant="ghost">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}