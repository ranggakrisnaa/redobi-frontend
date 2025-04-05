export type StudentFilter = {
  tahun_masuk: string;
  major: string;
  class: string;
};

export type StudentFilterParams = {
  angkatan: string | null;
  jurusan: string | null;
  kelas: string | null;
};
