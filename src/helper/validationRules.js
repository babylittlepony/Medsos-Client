const validationRules = {
  username: {
    required: { value: true, message: "Username wajib di isi" },
  },
  password: {
    required: { value: true, message: "Password wajib di isi" },
  },
  nama: {
    required: { value: true, message: "Nama wajib di isi" },
  },
  email: {
    required: { value: true, message: "Email wajib di isi" },
  },
  no_selular: {
    required: { value: true, message: "Nomor Selular wajib di isi" },
  },
}

export default validationRules
