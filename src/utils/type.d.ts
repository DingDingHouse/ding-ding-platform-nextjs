interface DecodedToken {
  role: string;
}
interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  modalType: string;
  setModalType: (type: string) => void;
}
