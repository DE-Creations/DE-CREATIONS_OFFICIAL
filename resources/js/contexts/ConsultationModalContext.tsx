import { createContext, useContext, useState, ReactNode } from "react";
import { ConsultationModal } from "@/components/shared/ConsultationModal";

interface ConsultationModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType | undefined>(undefined);

export function ConsultationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ConsultationModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ConsultationModal open={isOpen} onOpenChange={setIsOpen} />
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal(): ConsultationModalContextType {
  const context = useContext(ConsultationModalContext);
  if (context === undefined) {
    throw new Error("useConsultationModal must be used within ConsultationModalProvider");
  }
  return context;
}
