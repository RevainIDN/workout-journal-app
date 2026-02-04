'use client'

import mainPageStyles from "./page.module.css";
import { formatDate } from "@/lib/utils/formatDate";
import { storageService } from "@/lib/storage/storageService";
import { useWorkoutStore } from "@/store/journal/useWorkoutStore";
import { useNutritionStore } from "@/store/journal/useNutritionStore";
import { useBodyStore } from "@/store/journal/useBodyStore";
import { useNotesStore } from "@/store/journal/useNotesStore";
import { useUIStore } from "@/store/uiStore";

import WorkoutSection from "./components/WorkoutSection/WorkoutSection";
import NutritionSection from "./components/NutritionSection/NutritionSection";
import WaterSection from "./components/WaterSection/WaterSection";
import WeightSection from "./components/WeightSection/WeightSection";
import MoodSection from "./components/MoodSection/MoodSection";
import NotesSection from "./components/NotesSection/NotesSection";
import Notification from "@/components/layout/Notification/Notification";

export default function Home() {
  const { isNotificationShow, showNotification } = useUIStore();

  const handleSave = () => {
    showNotification(true, 'Entry saved successfully!');

    // Получение данных из всех сторов
    const workoutData = useWorkoutStore.getState();
    const nutritionData = useNutritionStore.getState();
    const bodyData = useBodyStore.getState();
    const notesData = useNotesStore.getState();

    // Создание записей с меткой времени (уникально для каждого Save)
    const today = new Date().toISOString();
    const entry = {
      date: today,
      workout: {
        workoutType: workoutData.workoutType,
        workoutDescription: workoutData.workoutDescription,
        workoutDuration: workoutData.workoutDuration,
        moodAfter: workoutData.moodAfter,
        energyAfter: workoutData.energyAfter,
      },
      nutrition: nutritionData.meals,
      water: bodyData.litersOfWater,
      weight: bodyData.weight,
      notes: notesData.notes,
    };

    // Сохранение в localStorage
    storageService.saveEntry(entry);

    // Обнуление всех сторов
    workoutData.resetWorkout();
    nutritionData.resetMeals();
    bodyData.resetWater();
    bodyData.resetWeight();
    notesData.resetNotes();

    setTimeout(() => {
      showNotification(false, '');
    }, 5000);
  }

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
