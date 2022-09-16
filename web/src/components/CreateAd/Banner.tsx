import styles from "@styles/rgb.module.css";

import { Dialog } from "./Dialog";

export function Banner() {
  return (
    <section className={styles.rgb}>
      <div className="flex flex-col">
        <strong className="text-2xl font-black">Não encontrou seu duo?</strong>
        <span className="text-zinc-400">
          Publique um anúncio para encontrar novos players!
        </span>
      </div>
      <Dialog />
    </section>
  );
}
