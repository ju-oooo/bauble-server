/** 分页工具**/

/**
 * @param count 显示条数
 * @param pageNum 页数
 * @param defCount 最小显示条数
 * @returns {{start: number, end: number}}
 */
let pagingTool = function (count, pageNum, defCount) {
    count = parseInt(count);
    pageNum = parseInt(pageNum);
    if ((isNaN(count) || count < defCount) && (isNaN(pageNum) || pageNum < 1)) {
        count = defCount;
        pageNum = 1;
    }
    return {start: (pageNum - 1) * count, end: count};
}

module.exports = pagingTool;
