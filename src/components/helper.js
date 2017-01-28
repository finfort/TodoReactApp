export let MINES = [
    { id: 1, association: 'Макеев Уголь', mineName: 'Холодная Балка' },
    { id: 2, association: 'Макеев Уголь', mineName: 'Бажанова' },
    { id: 3, association: 'ДУЭК', mineName: 'Скочинского' },
    { id: 4, association: 'ДУЭК', mineName: 'Абакумова' },
    { id: 5, association: 'Снежное Антрацит', mineName: 'Заря' }
];

export function findMinebyId(userid) {
    let i;
    for (i = 0; this.MINES.length > i; i += 1) {
        if (this.MINES[i].id == userid) {
            return this.MINES[i];
        }
    }
}