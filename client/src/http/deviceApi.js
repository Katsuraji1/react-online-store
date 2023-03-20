import { $authHost } from '.';
import { $host } from '.';

export const fetchBrand =  async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const fetchType = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const fetchDevices = async (page, limit , TypeId, BrandId) => {
    const {data} = await $host.get('api/device', {
        params: {limit, page, TypeId, BrandId}
    })
    return data
}

export const fetchOneDevice = async(id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const createBrand = async(brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const createType = async(type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
} 