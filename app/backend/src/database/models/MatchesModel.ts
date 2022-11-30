import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';
// import OtherModel from './OtherModel';

class Match extends Model {
  // declare <campo>: <tipo>;
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Match.init({
  // ... Campos
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
Match.belongsTo(TeamModel, {
  foreignKey: 'home_team',
  as: 'teams',
});

Match.belongsTo(TeamModel, {
  foreignKey: 'away_team',
  as: 'teams',
});

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
TeamModel.hasMany(Match, {
  foreignKey: 'home_team',
  as: 'matches',
});

TeamModel.hasMany(Match, {
  foreignKey: 'away_team',
  as: 'matches',
});

export default Match;
