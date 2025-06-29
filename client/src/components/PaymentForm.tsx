
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Lock } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: () => void;
  onPaymentCancel: () => void;
  isProcessing: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  onPaymentSuccess, 
  onPaymentCancel, 
  isProcessing 
}) => {
  const { toast } = useToast();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate payment processing
    toast({
      title: "Processing Payment",
      description: "Please wait while we process your payment...",
    });

    // Simulate API call delay
    setTimeout(() => {
      // Simulate successful payment (90% success rate)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        toast({
          title: "Payment Successful",
          description: `Payment of $${amount.toFixed(2)} has been processed successfully!`,
        });
        onPaymentSuccess();
      } else {
        toast({
          title: "Payment Failed",
          description: "Payment processing failed. Please try again.",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Lock className="h-3 w-3" />
          <span>Secure Mock Payment (Demo)</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-lg font-semibold text-green-800">
            Total: ${amount.toFixed(2)}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber}
              onChange={(e) => setPaymentData({
                ...paymentData, 
                cardNumber: formatCardNumber(e.target.value)
              })}
              maxLength={19}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={(e) => setPaymentData({
                  ...paymentData, 
                  expiryDate: formatExpiry(e.target.value)
                })}
                maxLength={5}
                required
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={paymentData.cvv}
                onChange={(e) => setPaymentData({
                  ...paymentData, 
                  cvv: e.target.value.replace(/[^0-9]/g, '')
                })}
                maxLength={4}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="nameOnCard">Name on Card</Label>
            <Input
              id="nameOnCard"
              placeholder="John Doe"
              value={paymentData.nameOnCard}
              onChange={(e) => setPaymentData({
                ...paymentData, 
                nameOnCard: e.target.value
              })}
              required
            />
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onPaymentCancel}
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </div>
        </form>
        
        <div className="mt-4 p-2 bg-gray-50 rounded text-xs text-gray-600">
          <strong>Demo Mode:</strong> This is a mock payment system for testing. 
          Use any card details - 90% success rate simulation.
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
