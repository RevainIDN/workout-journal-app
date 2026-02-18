'use client'

import statsStyles from './StatsSection.module.css'
import { useState, useEffect, useMemo } from 'react'
import { JournalEntry } from '@/types/journalEntryTypes'
import InfoCard from '@/components/ui/InfoCard/InfoCard'

import ProgressIcon from '@/components/icons/ProgressIcon'
import MealIcon from '@/components/icons/MealIcon'
import WeightIcon from '@/components/icons/WeightIcon'

import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	BarChart,
	Bar,
} from 'recharts'

export default function StatsSection() {
	const [entries, setEntries] = useState<JournalEntry[]>([])

	useEffect(() => {
		const storedData = localStorage.getItem('journal-entries')
		if (storedData) {
			const data = JSON.parse(storedData)
			setEntries(Array.isArray(data) ? data : data.entries || [])
		}
	}, [])

	const totalWorkouts = entries.reduce((total, entry) => total + (entry.workout?.workoutType && entry.workout.workoutDescription ? 1 : 0), 0)
	const waterEntries = entries.filter(e => e.water && e.water > 0)
	const avgWater = waterEntries.length > 0
		? Math.round(waterEntries.reduce((sum, e) => sum + (e.water || 0), 0) / waterEntries.length)
		: 0
	const totalMeals = entries.reduce((total, entry) => total + (entry.nutrition?.length || 0), 0)

	const sortedEntries = useMemo(() => {
		return [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	}, [entries])

	// helper: last 7 calendar days (from 6 days ago to today)
	const last7Days = useMemo(() => {
		const days: Date[] = []
		for (let i = 6; i >= 0; i--) {
			const d = new Date()
			d.setDate(d.getDate() - i)
			d.setHours(0, 0, 0, 0)
			days.push(d)
		}
		return days
	}, [])

	const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

	// workout: Bar chart — duration per day for last 7 days (x: weekday)
	const workoutData = useMemo(() => {
		return last7Days.map(d => {
			const totalDuration = sortedEntries.reduce((sum, e) => {
				const entryDate = new Date(e.date)
				entryDate.setHours(0, 0, 0, 0)
				if (isSameDay(entryDate, d)) {
					return sum + (Number(e.workout?.workoutDuration) || 0)
				}
				return sum
			}, 0)
			return { date: d.toLocaleDateString('en-US', { weekday: 'short' }), duration: totalDuration }
		})
	}, [last7Days, sortedEntries])

	// nutrition: Line chart — daily totals (calories, protein, carbs, fats) for last 7 days
	const nutritionData = useMemo(() => {
		return last7Days.map(d => {
			const totals = sortedEntries.reduce((acc, e) => {
				const entryDate = new Date(e.date)
				entryDate.setHours(0, 0, 0, 0)
				if (isSameDay(entryDate, d)) {
					; (e.nutrition || []).forEach(meal => {
						acc.calories += Number(meal.calories || 0)
						acc.protein += Number(meal.protein || 0)
						acc.carbs += Number(meal.carbs || 0)
						acc.fats += Number(meal.fats || 0)
					})
				}
				return acc
			}, { calories: 0, protein: 0, carbs: 0, fats: 0 })

			return {
				date: d.toLocaleDateString('en-US', { weekday: 'short' }),
				calories: totals.calories,
				protein: totals.protein,
				carbs: totals.carbs,
				fats: totals.fats,
			}
		})
	}, [last7Days, sortedEntries])

	// weight: Line chart — show weight entries (format date as 'Feb 13') across available data (filtered to last 30 entries)
	const weightData = useMemo(() => {
		return sortedEntries
			.map(e => ({ date: new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), weight: Number(e.weight || 0) }))
			.filter(d => d.weight > 0)
			.slice(-30)
	}, [sortedEntries])

	return (
		<section className={statsStyles.statsSection}>
			<div className={statsStyles.statsInfo}>
				<InfoCard type="Workout" title='Total Workouts' value={totalWorkouts} fontSize='1.5rem' titleFontSize='0.8rem' height={120} svgCover={true} />
				<InfoCard type="Water" title='Avg Water' value={`${avgWater}`} subValue='Liters' fontSize='1.5rem' titleFontSize='0.8rem' height={120} svgCover={true} />
				<InfoCard type="Nutrition" title='Total Meals' value={totalMeals} fontSize='1.5rem' titleFontSize='0.8rem' height={120} svgCover={true} />
				<InfoCard type="Entries" title='Entries' value={entries.length} fontSize='1.5rem' titleFontSize='0.8rem' height={120} svgCover={true} />
			</div>

			<div className={statsStyles.statsCharts}>
				<div className={statsStyles.chartCard}>
					<div className={`${statsStyles.chartHeader} ${statsStyles.workoutHeader}`}>
						<ProgressIcon />
						<h3 className={statsStyles.chartTitle}>Workout Duration (Last 7 Days)</h3>
					</div>
					{workoutData.length === 0 ? <p>No data yet</p> : (
						<ResponsiveContainer width="100%" height={250}>
							<BarChart data={workoutData}>
								<CartesianGrid stroke="var(--secondary-color)" strokeDasharray="3 3" strokeOpacity={0.12} />
								<XAxis dataKey="date" stroke="var(--secondary-color)" tick={{ fill: 'var(--secondary-color)' }} axisLine={{ stroke: 'var(--secondary-color)' }} tickLine={{ stroke: 'var(--secondary-color)' }} />
								<YAxis stroke="var(--secondary-color)" tick={{ fill: 'var(--secondary-color)' }} axisLine={{ stroke: 'var(--secondary-color)' }} tickLine={{ stroke: 'var(--secondary-color)' }} />
								<Tooltip />
								<Legend />
								<Bar dataKey="duration" fill="var(--pastel-blue)" radius={[6, 6, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					)}
				</div>

				<div className={statsStyles.chartCard}>
					<div className={`${statsStyles.chartHeader} ${statsStyles.nutritionHeader}`}>
						<MealIcon />
						<h3 className={statsStyles.chartTitle}>Nutrition Tracking (Last 7 Days)</h3>
					</div>
					{nutritionData.length === 0 ? <p>No data yet</p> : (
						<ResponsiveContainer width="100%" height={250}>
							<LineChart data={nutritionData}>
								<CartesianGrid stroke="var(--secondary-color)" strokeDasharray="3 3" strokeOpacity={0.12} vertical={false} />
								<XAxis dataKey="date" stroke="var(--secondary-color)" tick={{ fill: 'var(--secondary-color)' }} axisLine={{ stroke: 'var(--secondary-color)' }} tickLine={{ stroke: 'var(--secondary-color)' }} />
								<YAxis stroke="var(--secondary-color)" tick={{ fill: 'var(--secondary-color)' }} axisLine={{ stroke: 'var(--secondary-color)' }} tickLine={{ stroke: 'var(--secondary-color)' }} />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="calories" stroke="var(--pastel-peach)" strokeWidth={2} dot={{ r: 3 }} />
								<Line type="monotone" dataKey="protein" stroke="var(--pastel-pink)" strokeWidth={2} dot={{ r: 3 }} />
								<Line type="monotone" dataKey="carbs" stroke="var(--pastel-lavender)" strokeWidth={2} dot={{ r: 3 }} />
								<Line type="monotone" dataKey="fats" stroke="var(--pastel-green)" strokeWidth={2} dot={{ r: 3 }} />
							</LineChart>
						</ResponsiveContainer>
					)}
				</div>

				<div className={statsStyles.chartCard}>
					<div className={`${statsStyles.chartHeader} ${statsStyles.weightHeader}`}>
						<WeightIcon />
						<h3 className={statsStyles.chartTitle}>Weight Progress</h3>
					</div>
					{weightData.length === 0 ? <p>No weight data</p> : (
						<ResponsiveContainer width="100%" height={250}>
							<LineChart data={weightData}>
								<CartesianGrid stroke="var(--secondary-color)" strokeDasharray="3 3" strokeOpacity={0.12} vertical={false} />
								<XAxis dataKey="date" stroke="var(--secondary-color)" tick={{ fill: 'var(--secondary-color)' }} axisLine={{ stroke: 'var(--secondary-color)' }} tickLine={{ stroke: 'var(--secondary-color)' }} />
								<YAxis stroke="var(--secondary-color)" tick={{ fill: 'var(--secondary-color)' }} axisLine={{ stroke: 'var(--secondary-color)' }} tickLine={{ stroke: 'var(--secondary-color)' }} />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="weight" stroke="var(--pastel-green)" strokeWidth={2} dot={{ r: 3 }} />
							</LineChart>
						</ResponsiveContainer>
					)}
				</div>
			</div>
		</section>
	)
}