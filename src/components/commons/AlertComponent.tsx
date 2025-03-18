import { AlertComponentProps } from '@/commons/types/component-container-props.type.ts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { AlertCircle } from 'lucide-react';
import * as React from 'react';

const AlertComponent: React.FC<AlertComponentProps> = ({ children }) => {
  return (
    <div className="mb-3">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertComponent;
