import logo from '@/assets/images/redobi.png';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import {
  Book,
  ClipboardList,
  FilePenLine,
  FileUser,
  GraduationCap,
  Home,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const menuItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Mahasiswa', icon: Users, path: '/students' },
  { name: 'Dosen Pembimbing', icon: GraduationCap, path: '/dosen' },
  { name: 'Kriteria & Sub-kriteria', icon: ClipboardList, path: '/kriteria' },
  { name: 'Penilaian Dosen', icon: FilePenLine, path: '/penilaian' },
  { name: 'Judul Skripsi', icon: Book, path: '/judul' },
  { name: 'Hasil Rekomendasi', icon: FileUser, path: '/hasil' },
];

const SideBarComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="w-64 h-screen bg-muted flex flex-col border-r">
      <div className="p-4 border-b flex items-center gap-2">
        <img src={logo} alt="ReDoBi" className="h-[40px] w-[110px]" />
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className={cn(
                'w-full flex justify-start gap-2 text-muted-foreground transition-colors',
                location.pathname === item.path
                  ? 'bg-primary-100 text-primary-700 hover:bg-primary-100'
                  : 'hover:bg-primary/20 hover:text-primary-700 text-black',
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="User" />
          <AvatarFallback>SNB</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">Saiful Nur Budiman</span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default SideBarComponent;
