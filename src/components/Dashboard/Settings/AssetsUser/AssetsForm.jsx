import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import assetsRules from "../../../../helper/validationRules"
import api from "../../../../services/api"

export const AssetsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/assets/platform", {
        ...data,
        id_pengguna: 17,
      })
      toast.loading()
      console.log(res)
      toast.remove()
      toast.success("Sukses membuat Asset")
    } catch (error) {
      console.log(error)
      toast.error("Gagal membuat Asset")
    }
  }

  return (
    <div>
      <h1 className="text-center text-xl font-bold">Buat Assets</h1>
      {/* FORM */}
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="font-medium" htmlFor="username">
            Username
          </label>
          <input
            className={`rounded-md border border-gray-300 bg-gray-50 p-1 outline-none  ${
              errors?.username && "border-red-300"
            }  text-gray-900`}
            type="text"
            {...register("username", assetsRules.username)}
          />
          {errors?.username && (
            <span className="mt-2 text-sm">{errors.username.message}</span>
          )}
        </div>
        <div className="my-4 flex flex-col">
          <label className="font-medium" htmlFor="email">
            Email
          </label>
          <input
            className={`rounded-md border border-gray-300 bg-gray-50 p-1 outline-none  ${
              errors?.email && "border-red-300"
            }  text-gray-900`}
            type="email"
            {...register("email", assetsRules.email)}
          />
          {errors?.email && (
            <span className="mt-2 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="my-4 flex flex-col">
          <label className="font-medium" htmlFor="nama_akun">
            Nama akun
          </label>
          <input
            className={`rounded-md border border-gray-300 bg-gray-50 p-1 outline-none  ${
              errors?.nama_akun && "border-red-300"
            }  text-gray-900`}
            type="text"
            {...register("nama_akun", assetsRules.nama_akun)}
          />
          {errors?.nama_akun && (
            <span className="mt-2 text-sm">{errors.nama_akun.message}</span>
          )}
        </div>
        <div className="my-4 flex flex-col">
          <select {...register("platform")} className="p-2">
            <option value="INSTAGRAM">Instagram</option>
            <option value="FACEBOOK">Facebook</option>
            <option value="TIKTOK">Tiktok</option>
            <option value="TWITTER">Twitter</option>
            <option value="YOUTUBE">Youtube</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-gray-300 py-2 text-center font-bold"
        >
          Create
        </button>
      </form>
    </div>
  )
}
