import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isContactModalOpen: boolean;
  productName: string;
  openContactModal: (product?: string) => void;
  closeContactModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [productName, setProductName] = useState('');

  const openContactModal = (product: string = '') => {
    setProductName(product);
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isContactModalOpen, productName, openContactModal, closeContactModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useContactModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useContactModal must be used within a ModalProvider');
  }
  return context;
};
