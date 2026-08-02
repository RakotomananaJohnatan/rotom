import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Reveal from "@/components/Reveal";
import { evChargers } from "@/data/evChargers";
import { useLang } from "@/i18n/useLang";

const AUTO_SCROLL_INTERVAL = 4000;
const PAUSE_AFTER_INTERACTION = 5000;

const EvChargingCarousel = () => {
  const { lang } = useLang();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    if (!api || isPausedRef.current) return;
    stopAutoScroll();
    autoScrollRef.current = setInterval(() => {
      api.scrollNext();
    }, AUTO_SCROLL_INTERVAL);
  }, [api, stopAutoScroll]);

  const pauseAutoScroll = useCallback(() => {
    isPausedRef.current = true;
    stopAutoScroll();
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
      startAutoScroll();
    }, PAUSE_AFTER_INTERACTION);
  }, [startAutoScroll, stopAutoScroll]);

  useEffect(() => {
    if (!api) return;
    startAutoScroll();
    return () => {
      stopAutoScroll();
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [api, startAutoScroll, stopAutoScroll]);

  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 pb-14">
      <Reveal variant="fade-in-up" className="mb-8">
        <div className="font-impact text-xs uppercase tracking-[0.3em] text-brand-cyan mb-2">
          {lang === "en" ? "E-mobility" : "Mobilité électrique"}
        </div>
        <h2 className="font-impact text-3xl md:text-4xl uppercase font-bold text-primary">
          {lang === "en" ? "EV Charging Station" : "Bornes de recharge"}
        </h2>
        <p className="text-muted-foreground text-sm mt-2">
          {lang === "en"
            ? "Discover our range of AC and DC charging stations"
            : "Découvrez notre gamme de bornes de recharge AC et DC"}
        </p>
      </Reveal>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
        onPointerDown={pauseAutoScroll}
      >
        <CarouselContent className="-ml-4">
          {evChargers.map((c) => (
            <CarouselItem key={c.slug} className="pl-4 sm:basis-1/2 lg:basis-1/3">
              <Link
                to={`/borne-recharge/${c.slug}`}
                className="bg-card border-2 border-border hover:border-fluo-yellow transition-colors flex flex-col h-full group"
              >
                <div className="aspect-video bg-secondary border-b-2 border-border flex items-center justify-center overflow-hidden">
                  <img
                    src={c.img}
                    loading="lazy"
                    width={400}
                    height={225}
                    alt={`${c.name} — ${c.power} ${c.current} — ROTOM`}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-impact text-lg uppercase font-bold text-primary leading-tight">{c.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{c.subtitle[lang]}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-border pt-3 font-mono-spec text-[11px]">
                    <span className="text-primary font-bold">{c.power} · {c.current}</span>
                    <span className="text-brand-cyan inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      {lang === "en" ? "Discover" : "Découvrir"} <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
};

export default EvChargingCarousel;
