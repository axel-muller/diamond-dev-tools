import {bonus_score_history, stake_history} from "../models/init-models";
import {Op, Sequelize} from "sequelize";

const listBonusScore = async (req:any, res:any )=>{
    const { address } = req.params;
    const result = await bonus_score_history.findAndCountAll({
        attributes: [
            // [Sequelize.literal(`'0x' || encode(node, 'hex')`), 'node'],
            'from_block',
            'to_block',
            'bonus_score'
        ],
        where: Sequelize.where(
            Sequelize.literal(`'0x' || encode(node, 'hex')`),
            Op.eq,
            Sequelize.fn('lower', Sequelize.literal(`'${address}'`))
        ),
        order: [['from_block', 'ASC']]
    });

    res.json({
        data: result?.rows || [],
        count: result?.count ?? 0
    })
}

const listStakeHistory = async (req:any, res:any )=>{
    const { address } = req.params;
    const result = await stake_history.findAndCountAll({
        attributes: [
            'from_block',
            'to_block',
            'stake_amount'
        ],
        where: Sequelize.where(
            Sequelize.literal(`'0x' || encode(node, 'hex')`),
            Op.eq,
            Sequelize.fn('lower', Sequelize.literal(`'${address}'`))
        ),
        order: [['from_block', 'ASC']]
    });

    res.json({
        data: result?.rows || [],
        count: result?.count ?? 0
    })
}


export default {
    listBonusScore: listBonusScore,
    listStakeHistory: listStakeHistory,
}
