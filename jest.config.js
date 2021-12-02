module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.test.tsx?$': 'ts-jest',
    '^.+\\.test.ts?$': 'ts-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
