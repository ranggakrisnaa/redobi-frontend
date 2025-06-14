/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultEnum } from '@/commons/enums/enum';
import { ProfileFormSchema } from '@/commons/schema/update-profile.schema';
import DashboardContainer from '@/components/containers/DashboardContainer';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useProfileUser, useUpdateProfile } from '@/hooks/useAuth';
import { useScrollToTopOnPush } from '@/hooks/useScrollTopOnPush';
import { Camera, Edit, Slash, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detailRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useScrollToTopOnPush(detailRef, []);

  const { mutate: updateProfile } = useUpdateProfile();
  const { data: getProfile } = useProfileUser();

  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    imageUrl: '',
  });

  const { register, handleSubmit, reset } = useForm<ProfileFormSchema>({
    defaultValues: profile,
  });

  useEffect(() => {
    if (getProfile?.data) {
      const newProfile = {
        name: getProfile.data.fullName,
        email: getProfile.data.email,
        username: getProfile.data.username,
        password: '*'.repeat(5),
        imageUrl: getProfile.data.imageUrl,
      };
      setProfile(newProfile);
    }
  }, [getProfile]);

  useEffect(() => {
    reset({
      name: profile.name,
      email: profile.email,
      username: profile.username,
      password: profile.password,
    });
  }, [profile, reset]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Silakan pilih file gambar yang valid (JPEG, PNG, atau GIF)');
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('Ukuran file maksimal 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImagePreview(null);
    reset({
      name: profile.name,
      email: profile.email,
      username: profile.username,
      password: profile.password,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const onSubmit = (data: ProfileFormSchema) => {
    const { password: _, ...rest } = data;
    console.log(data);

    const updatedData = {
      ...rest,
      fullName: rest.name,
      file: fileInputRef.current?.files?.[0] || undefined,
    };

    updateProfile(updatedData, {
      onSuccess: () => {
        setProfile((prev) => ({
          ...prev,
          ...rest,
          imageUrl: imagePreview || prev.imageUrl,
          password: prev.password,
        }));
        setIsEditing(false);
        setImagePreview(null);
      },
      onError: (error) => {
        console.error('Gagal memperbarui profil:', error);
        toast({ title: 'Gagal!', description: error, duration: 2000 });
      },
    });
  };

  const currentAvatar =
    imagePreview || profile.imageUrl || DefaultEnum.IMAGE_DEFAULT.toString();

  return (
    <div ref={detailRef}>
      <DashboardContainer pageTitle="">
        <BreadcrumbList>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/profile')}
              className={
                location.pathname === '/profile'
                  ? 'text-black font-medium hover:cursor-pointer'
                  : 'hover:cursor-pointer'
              }
            >
              Profile Admin
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>

        <div className="mt-6 flex justify-center">
          <Card className="w-full max-w-4xl shadow-md border border-gray-200">
            <CardContent className="p-8">
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div
                      className={`w-32 h-32 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-3xl font-semibold relative ${
                        isEditing
                          ? 'cursor-pointer hover:opacity-80 transition-opacity'
                          : ''
                      }`}
                      onClick={handleImageClick}
                    >
                      <img
                        src={currentAvatar}
                        alt="Profile"
                        className="w-full h-full object-cover absolute"
                      />
                      {isEditing && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <div className="mt-3 flex flex-col gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleImageClick}
                          className="w-full text-xs"
                        >
                          <Upload className="w-3 h-3 mr-1" />
                          Upload Foto
                        </Button>
                        {imagePreview && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={removeImage}
                            className="w-full text-xs text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Hapus
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex-1 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Informasi Profil
                  </h2>

                  {isEditing ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div>
                          <label className="text-gray-500 block mb-1">
                            Nama
                          </label>
                          <input
                            {...register('name', { required: true })}
                            className="mt-1 border border-gray-300 rounded px-3 py-2 w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="text-gray-500 block mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            {...register('email', { required: true })}
                            className="mt-1 border border-gray-300 rounded px-3 py-2 w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="text-gray-500 block mb-1">
                            Username
                          </label>
                          <input
                            {...register('username', { required: true })}
                            className="mt-1 border border-gray-300 rounded px-3 py-2 w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="text-gray-500 block mb-1">
                            Password
                          </label>
                          <input
                            type="password"
                            disabled
                            {...register('password')}
                            className="mt-1 border border-gray-300 rounded px-3 py-2 w-full bg-white text-gray-900 placeholder-gray-500"
                            placeholder="Tidak dapat diubah di sini"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <Button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Simpan
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancel}
                        >
                          Batal
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div>
                          <p className="text-gray-500">Nama</p>
                          <p className="text-gray-900 font-medium mt-1">
                            {profile.name}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="text-gray-900 font-medium mt-1">
                            {profile.email}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Username</p>
                          <p className="text-gray-900 font-medium mt-1">
                            {profile.username}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Password</p>
                          <p className="text-gray-900 font-medium mt-1">
                            {profile.password}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <Button
                          type="button"
                          onClick={handleEditClick}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Profil
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default ProfilePage;
