import * as migration_20250902_022139 from './20250902_022139'

export const migrations = [
	{
		up: migration_20250902_022139.up,
		down: migration_20250902_022139.down,
		name: '20250902_022139'
	}
]
