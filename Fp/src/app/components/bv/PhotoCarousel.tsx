// Carrusel de fotos con autoplay, flechas, dots, y borde de "camino ecológico"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';

interface PhotoCarouselProps {
  photos: { src: string; alt?: string; caption?: string }[];
  height?: number;
  glowColor?: string;
  rounded?: number;
  /** Si true, agrega borde ilustrado tipo camino ecológico con hojas */
  ecoBorder?: boolean;
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
      style={{
        position: 'absolute',
        top: '50%',
        [direction]: 10,
        transform: 'translateY(-50%)',
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: 'rgba(62,39,35,0.85)',
        border: '2px solid #F4C430',
        color: '#F4C430',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 22,
        lineHeight: 1,
        padding: 0,
        transition: 'transform 0.2s, background 0.2s',
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = '#F4C430';
        (e.currentTarget as HTMLElement).style.color = '#3E2723';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-50%) scale(1.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(62,39,35,0.85)';
        (e.currentTarget as HTMLElement).style.color = '#F4C430';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-50%) scale(1)';
      }}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  );
}

export function PhotoCarousel({
  photos,
  height = 220,
  glowColor = '#C0392B',
  rounded = 12,
  ecoBorder = false,
}: PhotoCarouselProps) {
  const [hover, setHover] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    pauseOnHover: false,
    prevArrow: <ArrowButton direction="left" />,
    nextArrow: <ArrowButton direction="right" />,
  };

  const ecoPad = ecoBorder ? 14 : 0;

  return (
    <div
      style={{
        position: 'relative',
        padding: ecoPad,
        background: ecoBorder
          ? 'repeating-linear-gradient(45deg, #1A7A4A 0 8px, #145a36 8px 16px)'
          : 'transparent',
        borderRadius: ecoBorder ? rounded + 8 : rounded,
        boxShadow: ecoBorder ? '0 12px 26px rgba(20,90,54,0.35)' : 'none',
      }}
    >
      {ecoBorder && <EcoLeaves />}
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      style={{
        position: 'relative',
        borderRadius: rounded,
        overflow: 'hidden',
        boxShadow: hover
          ? `0 0 0 3px ${glowColor}, 0 18px 36px rgba(62,39,35,0.35), 0 0 32px ${glowColor}55`
          : '0 6px 18px rgba(62,39,35,0.18)',
        transition: 'box-shadow 0.3s ease',
        background: '#3E2723',
      }}
    >
      <Slider {...settings}>
        {photos.map((p, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <div style={{ position: 'relative', width: '100%', height }}>
              <ImageWithFallback
                src={p.src}
                alt={p.alt ?? ''}
                style={{
                  width: '100%',
                  height,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* Vignette + caption */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)',
                  pointerEvents: 'none',
                }}
              />
              {p.caption && (
                <div
                  style={{
                    position: 'absolute',
                    left: 16,
                    right: 16,
                    bottom: 22,
                    color: '#FFF8EE',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 18,
                    letterSpacing: '0.06em',
                    textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                  }}
                >
                  {p.caption}
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>

      <style>{`
        .slick-dots { bottom: 8px; }
        .slick-dots li button:before {
          color: #FFF8EE;
          opacity: 0.55;
          font-size: 9px;
        }
        .slick-dots li.slick-active button:before {
          color: #F4C430;
          opacity: 1;
        }
        .slick-prev, .slick-next { width: 38px; height: 38px; z-index: 5; }
        .slick-prev:before, .slick-next:before { content: ''; }
        .slick-prev { left: 10px; }
        .slick-next { right: 10px; }
      `}</style>
    </motion.div>
    </div>
  );
}

// Hojitas ilustradas en las esquinas del marco "camino ecológico"
function EcoLeaves() {
  const positions: Array<{ top?: number; bottom?: number; left?: number; right?: number; rot: number }> = [
    { top: -10, left: 16, rot: -25 },
    { top: -10, right: 16, rot: 25 },
    { bottom: -10, left: 16, rot: 200 },
    { bottom: -10, right: 16, rot: 155 },
    { top: '50%' as unknown as number, left: -10, rot: -90 },
    { top: '50%' as unknown as number, right: -10, rot: 90 },
  ];
  return (
    <>
      {positions.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 32 32"
          width={26}
          height={26}
          style={{
            position: 'absolute',
            top: p.top as number | string | undefined,
            bottom: p.bottom,
            left: p.left as number | string | undefined,
            right: p.right,
            transform: `rotate(${p.rot}deg)`,
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))',
            pointerEvents: 'none',
          }}
        >
          <path
            d="M16 2 C8 6, 4 14, 6 26 C14 24, 22 18, 26 8 C22 4, 18 2, 16 2 Z"
            fill="#1A7A4A"
            stroke="#0d4a2b"
            strokeWidth="1.5"
          />
          <path
            d="M14 24 C16 16, 20 10, 24 6"
            fill="none"
            stroke="#0d4a2b"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </>
  );
}
