import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFoundComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Card className="max-w-md w-full text-center shadow-xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold">404 Not Found</h1>
          <p className="text-muted-foreground">
            Maaf, halaman yang anda cari tidak ditemukan.
          </p>
          <Button variant="default" onClick={() => navigate('/')}>
            Kembali ke Beranda
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundComponent;
