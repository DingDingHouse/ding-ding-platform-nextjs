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
  status: string;
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
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [status, setStatus] = useState<string>("active");
  const [editingQr, setEditingQr] = useState<QRCode | null>(null);

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

  const handleAddQrCode = async () => {
    if (!selectedPlatform) {
      alert("Please select a payment platform.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("paymentPlatform", selectedPlatform);
    formData.append("status", status);
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("/api/paymentQrs", { method: "POST", body: formData });
    const data = await response.json();
    setQrCodes([...qrCodes, data.data]);
    closeQrModal();
  };

  const handleDeleteQrCode = async (id: string) => {
    const response = await fetch(`/api/paymentQrs?id=${id}`, { method: "DELETE" });
    if (response.ok) {
      setQrCodes(qrCodes.filter((qr) => qr._id !== id));
    }
  };

  const openQrModal = () => {
    setIsQrModalOpen(true);
    setName("");
    setImage(null);
    setImagePreview(null);
    setSelectedPlatform("");
    setStatus("active");
  };

  const closeQrModal = () => {
    setIsQrModalOpen(false);
    setName("");
    setImage(null);
    setImagePreview(null);
    setSelectedPlatform("");
    setStatus("active");
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={openQrModal} variant="default">
          + Add QR Code
        </Button>
      </div>

      {/* Payment Methods */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Payment Methods</h2>
        <div className="flex flex-wrap gap-2">
          {paymentTypes.map((type) => (
            <Button key={type._id} onClick={() => setSelectedPaymentType(type.name)} variant="outline">
              <Image src={type.thumbnail || "/placeholder.svg"} alt={type.name} width={40} height={40} />
              {type.name}
            </Button>
          ))}
        </div>
      </div>

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
            <Label>Status</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qrCodes.map((qr) => (
                <TableRow key={qr._id}>
                  <TableCell>
                    <Image src={qr?qr.image:""} alt={qr.name} width={48} height={48} />
                  </TableCell>
                  <TableCell>{qr.name}</TableCell>
                  <TableCell>{qr.status}</TableCell>
                  <TableCell>
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
    </div>
  );
}
