try {
	switch(process.env.NODE_ENV){
		case 'development':
			process.env.DB_URL = `postgres://${process.env.PG_USERNAME}@${process.env.PG_HOSTNAME}:${process.env.PG_PORT}/${process.env.PG_DB_NAME}`;
			console.log(process.env.DB_URL);
			break;
		case 'production':
			process.env.DB_URL = `postgres://${process.env.RDS_USERNAME}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
			break;
	}

}catch (err){
	console.log(err);
}
