'use client'

import mainPageStyles from "./page.module.css";
import { formatDate } from "@/lib/utils/formatDate";
import { useUIStore } from "@/store/uiStore";
import { useSaveEntry } from "./hooks/useSaveEntry";

import WorkoutSection from "./components/WorkoutSection/WorkoutSection";
import NutritionSection from "./components/NutritionSection/NutritionSection";
import WaterSection from "./components/WaterSection/WaterSection";
import WeightSection from "./components/WeightSection/WeightSection";
import MoodSection from "./components/MoodSection/MoodSection";
import NotesSection from "./components/NotesSection/NotesSection";
import Notification from "@/components/layout/Notification/Notification";

export default function Home() {
  const { isNotificationShow } = useUIStore();
  const saveEntry = useSaveEntry();

  const handleSave = () => {
    saveEntry();
  };

  return (
    <>
      {isNotificationShow && <Notification />}
      <main className={mainPageStyles.todayPage}>
        <div className={mainPageStyles.pageContent}>
          <div className={mainPageStyles.header}>
            <h1 className={mainPageStyles.title}>Today's Entry</h1>
            <p className={mainPageStyles.subtitle}>Log your workout, meals, and wellness metrics for {formatDate(Date.now())}</p>
          </div>
          <WorkoutSection />
          <NutritionSection />
          <div className={mainPageStyles.unifyingContainer}>
            <WaterSection />
            <WeightSection />
          </div>
          <MoodSection />
          <NotesSection />
          <button className={mainPageStyles.saveButton} onClick={handleSave}><h3>Save Today's Entry</h3></button>
        </div>
      </main>
    </>
  );
}
