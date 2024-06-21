import { useDaumPostcodePopup } from 'react-daum-postcode'
import { useState } from 'react'

export function usePostcode() {
    const [korAddress, setKorAddress] = useState<string>()
    const [engAddress, setEngAddress] = useState<string>()

    const open = useDaumPostcodePopup()

    const handleComplete = (data: any) => {
        let kor = data.roadAddress
        const building = data.buildingName
        const eng = data.roadAddressEnglish

        if (building !== '') {
            kor += `(${building})`
        }

        setKorAddress(kor)
        setEngAddress(eng)
    }

    const openAddressDialog = () => {
        open({ onComplete: handleComplete })
    }

    return { openAddressDialog, korAddress, engAddress }
}
