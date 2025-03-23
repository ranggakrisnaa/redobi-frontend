export const filterOptions = {
  angkatan: Array.from({ length: 10 }, (_, index) => {
    const year = new Date().getFullYear() - index;
    return { value: year.toString(), label: year.toString() };
  }),
  jurusan: [
    { value: 'Sistem Cerdas', label: 'Sistem Cerdas' },
    { value: 'Rekayasa Perangkat Lunak', label: 'Rekayasa Perangkat Lunak' },
    { value: 'Multimedia', label: 'Multimedia' },
  ],
  kelas: [
    { value: 'Karyawan', label: 'Karyawan' },
    { value: 'Reguler', label: 'Reguler' },
    { value: 'Reguler Malam', label: 'Reguler Malam' },
  ],
};
