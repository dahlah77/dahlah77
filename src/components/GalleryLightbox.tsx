import { AnimatePresence, motion } from 'framer-motion';
import { GalleryItem } from '../types/content';

type GalleryLightboxProps = {
  item: GalleryItem | null;
  onClose: () => void;
};

export const GalleryLightbox = ({ item, onClose }: GalleryLightboxProps) => (
  <AnimatePresence>
    {item ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl overflow-hidden rounded-2xl border border-cyan-200/20 bg-slate-950"
          onClick={(event) => event.stopPropagation()}
        >
          <img src={item.image} alt={item.title} className="max-h-[70vh] w-full object-cover" loading="lazy" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-slate-300">{item.caption}</p>
          </div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);
