import * as migration_20250923_002736 from './20250923_002736'

export const migrations = [
	{
		up: migration_20250923_002736.up,
		down: migration_20250923_002736.down,
		name: '20250923_002736'
	}
]
