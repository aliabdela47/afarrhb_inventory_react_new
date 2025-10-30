import React,
{
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from 'react';
import ConfirmationDialog from '../components/ConfirmationDialog';

interface ConfirmationOptions {
  title: string;
  message: React.ReactNode;
}

interface ConfirmationContextType {
  confirm: (options: ConfirmationOptions) => Promise<boolean>;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (context === undefined) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider');
  }
  return context;
};

interface ConfirmationProviderProps {
  children: ReactNode;
}

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({ children }) => {
  const [options, setOptions] = useState<ConfirmationOptions | null>(null);
  const [resolve, setResolve] = useState<((confirmed: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmationOptions) => {
    return new Promise<boolean>((resolve) => {
      setOptions(options);
      setResolve(() => resolve); // Store the resolve function
    });
  }, []);

  const handleClose = () => {
    if (resolve) {
      resolve(false);
    }
    setOptions(null);
    setResolve(null);
  };

  const handleConfirm = () => {
    if (resolve) {
      resolve(true);
    }
    setOptions(null);
    setResolve(null);
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      <ConfirmationDialog
        isOpen={options !== null}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={options?.title || ''}
        message={options?.message || ''}
      />
    </ConfirmationContext.Provider>
  );
};
