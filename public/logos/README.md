# 📋 Logos do Psiecode

Esta pasta contém todas as versões das logos da Psiecode organizadas para uso no projeto.

## 🎯 Estrutura Recomendada

### SVG (Formato Principal)

```
/public/logos/
├── logo-primary.svg     # Logo principal (azul da marca)
├── logo-white.svg       # Logo branca (para fondos escuros)
├── logo-dark.svg        # Logo escura (para fundos claros)
└── logo-monochrome.svg  # Logo monocromática (backup)
```

### PNG (Formato de Backup)

```
/public/logos/
├── logo-primary@2x.png  # Logo principal em alta resolução
└── logo-white@2x.png    # Logo branca em alta resolução
```

## 🔧 Como Usar

### 1. Componente Logo Básico

```tsx
import { Logo } from "@/components/ui/Logo";

// Logo padrão
<Logo />

// Logo com variantes
<Logo variant="primary" size="lg" />
<Logo variant="white" size="md" />
<Logo variant="dark" size="sm" />
```

### 2. Logo Adaptativa (Dark Mode)

```tsx
import { AdaptiveLogo } from "@/components/ui/Logo";

// Automaticamente troca entre primary/white baseado no tema
<AdaptiveLogo size="lg" />;
```

## ⚙️ Para Ativar as Logos

1. **Adicione os arquivos SVG** nesta pasta seguindo a nomenclatura acima
2. **Descomente o código** em `src/components/ui/Logo.tsx`:
   - Remova o bloco de texto atual
   - Descomente as linhas com `Image` component
   - Adicione o import: `import Image from "next/image";`

## 🎨 Especificações

- **Formato preferido**: SVG (escalável, pequeno, customizável)
- **Resolução PNG**: @2x (alta resolução para dispositivos retina)
- **Tamanhos suportados**: sm (24px), md (32px), lg (48px), xl (64px)
- **Variantes**: primary, white, dark, monochrome

## 🌙 Suporte ao Dark Mode

O componente está preparado para:

- Trocar automaticamente entre variantes baseado no tema
- Usar `logo-primary.svg` no modo claro
- Usar `logo-white.svg` no modo escuro
- Fallback para `logo-monochrome.svg` se necessário

## 📱 Responsividade

As logos se adaptam automaticamente:

- **Desktop**: Tamanho padrão definido
- **Mobile**: Redimensionamento proporcional
- **Retina**: Uso de versões @2x quando disponível
