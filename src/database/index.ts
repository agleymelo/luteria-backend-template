import { Sequelize } from 'sequelize'

import databaseConfig from '../config/database'

class Database {
  public connection!: Sequelize;

  constructor () {
    this.initial()
  }

  initial (): void {
    this.connection = new Sequelize({
      dialect: 'postgres',
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      define: {
        timestamps: true,
        underscored: true
      }
    })
  }
}

const database: Database = new Database()

export default database
