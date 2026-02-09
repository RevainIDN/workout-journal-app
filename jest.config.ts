import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  // Предоставляем путь к Next.js приложению для загрузки next.config.js и .env файлов в тестовой среде
  dir: './',
})

// Добавляем пользовательскую конфигурацию для Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Добавляем пути для модулей
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: [
    '**/__tests__/**/*.{ts,tsx}',
    '**/*.{spec,test}.{ts,tsx}',
  ],
}

// createJestConfig — это экспортная функция Next.js, которая позволяет предоставить пользовательскую конфигурацию
export default createJestConfig(config)
