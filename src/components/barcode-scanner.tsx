"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScanBarcodeIcon as BarcodeScannerIcon, X } from "lucide-react"

export function BarcodeScanner() {
  const [isOpen, setIsOpen] = useState(false)
  const [barcodeValue, setBarcodeValue] = useState("")
  const [scanResult, setScanResult] = useState<null | {
    orderId: string
    itemId: string
    stage: string
    timestamp: string
  }>(null)

  const handleScan = () => {
    // In a real implementation, this would communicate with a barcode scanner
    // and process the scanned code. For now, we'll simulate a successful scan.
    if (barcodeValue) {
      setScanResult({
        orderId: "ORD-" + barcodeValue.substring(0, 4),
        itemId: "ITEM-" + barcodeValue.substring(4, 8),
        stage: ["Cutting", "Stitching", "Embroidery", "QC", "Packaging"][Math.floor(Math.random() * 5)],
        timestamp: new Date().toLocaleString(),
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleScan()
    }
  }

  if (!isOpen) {
    return (
      <Button variant="outline" className="w-full" onClick={() => setIsOpen(true)}>
        <BarcodeScannerIcon className="mr-2 h-4 w-4" />
        <span>Scan Barcode to Update Production Status</span>
      </Button>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Barcode Scanner</CardTitle>
          <CardDescription>Scan item barcode to update production status</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Enter or scan barcode"
            value={barcodeValue}
            onChange={(e) => setBarcodeValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            autoFocus
          />
          <Button onClick={handleScan}>
            <BarcodeScannerIcon className="mr-2 h-4 w-4" />
            Scan
          </Button>
        </div>

        {scanResult && (
          <div className="rounded-md bg-muted p-4">
            <div className="font-medium">Scan Result:</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>Order ID:</div>
              <div>{scanResult.orderId}</div>
              <div>Item ID:</div>
              <div>{scanResult.itemId}</div>
              <div>Current Stage:</div>
              <div>{scanResult.stage}</div>
              <div>Timestamp:</div>
              <div>{scanResult.timestamp}</div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Scan the barcode on the production item to automatically update its status in the system.
        </p>
      </CardFooter>
    </Card>
  )
}
