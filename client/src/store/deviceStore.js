import { makeAutoObservable } from 'mobx';

export default class devicesStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._limit = 5
        this._totalCount = 0
        makeAutoObservable(this)
    }

    setType(types) {
        this._types = types
    }

    setBrand(brands) {
        this._brands = brands
    }

    setDevice(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this.setPage(1);
        this._selectedType = type
    }

    setSelectedBrand(brand) {
        this.setPage(1);
        this._selectedBrand = brand
    }

    setLimit(limit) {
        this._limit = limit
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    setPage(page) {
        this._page = page
    }

    get Device() {
        return this._devices
    }

    get Brand() {
        return this._brands
    }

    get Type() {
        return this._types
    }

    get SelectedType() {
        return this._selectedType
    }

    get SelectedBrand() {
        return this._selectedBrand
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }

    get totalCount() {
        return this._totalCount
    }
}