import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[100px] -z-10" />

      <div className="text-center space-y-8 max-w-lg z-10">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <h1 className="text-9xl font-display font-black text-secondary leading-none">
                404
              </h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-20 pointer-events-none">
                <Icon name="device_hub" size="xl" className="text-primary w-full h-full text-[12rem]" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-secondary">
            Oops! Halaman Tidak Ditemukan
          </h2>
          
          <p className="text-base md:text-lg text-secondary/70 font-body max-w-md mx-auto">
            Maaf, rute yang Anda tuju sepertinya tidak ada atau telah dipindahkan. Mari kembali ke jalan yang benar.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button to="/" variant="secondary" icon="home" iconPosition="left" size="lg" className="w-full sm:w-auto">
            Beranda Utama
          </Button>
          <Button to="/admin/domains" variant="outline" icon="dashboard" iconPosition="left" size="lg" className="w-full sm:w-auto">
            Dashboard Admin
          </Button>
        </div>
      </div>
    </div>
  );
}
