module.exports = {
	apps: [
		{
			name: 'redis-server',
			script: './dist/main.js',
			env: {
				NODE_ENV: 'production'
			},
			env_production: {
				NODE_ENV: 'production'
			},
			instances: -1
		}
	]
};
