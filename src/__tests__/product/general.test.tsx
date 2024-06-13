import { getSizeStatus } from '@/app/product/[sku]/components/general'

describe('General Component Logic', () => {
    it('should return "selected" status', () => {
        const sizeList = ['230', '235', '240']
        const selected = '230'

        const sizeStatusList = getSizeStatus(sizeList, selected)

        expect(sizeStatusList.find((s) => s.size === '230')).toEqual({ size: '230', status: 'selected' })
    })
    it('should return "init" status', () => {
        const sizeList = ['230', '235', '240']
        const selected = ''

        const sizeStatusList = getSizeStatus(sizeList, selected)

        sizeStatusList.map((o) => expect(o.status).toBe('init'))
    })
})
