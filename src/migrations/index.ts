import * as migration_20250902_111535 from './20250902_111535'

export const migrations = [
	{
		up: migration_20250902_111535.up,
		down: migration_20250902_111535.down,
		name: '20250902_111535'
	}
]
