'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { deleteStripeAccount } from '../api/service';
import { Trash2 } from 'lucide-react';

interface DeleteStripeAccountButtonProps {
  accountId: string;
  userId: string;
  accountName: string;
}

export function DeleteStripeAccountButton({
  accountId,
  userId,
  accountName,
}: DeleteStripeAccountButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteStripeAccount(accountId, userId);
      setOpen(false);
      
      // Refresh the page to show updated list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting Stripe account:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-200">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Stripe Connection</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove the connection to <span className="font-medium">{accountName}</span>?
            <p className="mt-2">
              This will only remove the connection between SaaSBooks and your Stripe account. Your Stripe account and data will remain untouched.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {isDeleting ? 'Deleting...' : 'Delete Connection'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}