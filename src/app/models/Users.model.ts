import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'

import database from '../../database'

class Users extends Sequelize.Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;

  public password_hash!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public async checkPasswordHash (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash)
  }
}

Users.init(
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
    password_hash: Sequelize.STRING
  },
  {
    sequelize: database.connection
  }
)

Users.addHook(
  'beforeSave',
  async (user: Users): Promise<void> => {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8)
    }
  }
)

export default Users
