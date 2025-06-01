import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Variante da logo */
  variant?: "primary" | "white" | "dark" | "monochrome";
  /** Tamanho da logo */
  size?: "sm" | "md" | "lg" | "xl";
  /** Se deve ser um link clicável */
  clickable?: boolean;
  /** URL de destino do link */
  href?: string;
  /** Classes CSS customizadas */
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-auto",
  md: "h-8 w-auto",
  lg: "h-12 w-auto",
  xl: "h-16 w-auto",
};

// Dimensões aproximadas para cálculo de aspect ratio
const sizeDimensions = {
  sm: { width: 96, height: 24 },
  md: { width: 128, height: 32 },
  lg: { width: 192, height: 48 },
  xl: { width: 256, height: 64 },
};

export function Logo({
  variant = "primary",
  size = "md",
  clickable = true,
  href = "/",
  className,
}: LogoProps) {
  // Mapeamento das variantes para os arquivos
  const logoSrcMap = {
    primary: "/logos/logo-primary.svg",
    white: "/logos/logo-white.svg",
    dark: "/logos/logo-dark.png", // PNG pois não temos SVG escura
    monochrome: "/logos/logo-dark.png", // Usando a escura como monocromática
  };

  const logoSrc = logoSrcMap[variant];
  const dimensions = sizeDimensions[size];

  const logoContent = (
    <Image
      src={logoSrc}
      alt="Psiecode"
      width={dimensions.width}
      height={dimensions.height}
      className={cn(sizeClasses[size], className)}
      priority
    />
  );

  if (clickable) {
    return (
      <Link href={href} className="inline-block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

// Componente específico para uso com modo escuro automático
export function AdaptiveLogo(props: Omit<LogoProps, "variant">) {
  return (
    <>
      {/* Logo para modo claro */}
      <div className="block dark:hidden">
        <Logo {...props} variant="primary" />
      </div>
      {/* Logo para modo escuro */}
      <div className="hidden dark:block">
        <Logo {...props} variant="white" />
      </div>
    </>
  );
}
