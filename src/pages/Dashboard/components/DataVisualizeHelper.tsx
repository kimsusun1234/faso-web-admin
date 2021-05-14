//API
import Axios from 'axios';

type Item = {
    id: string;
    price: number;
}
type CartItem = {
    discount: number;
    quantity: number;
    item: Item;
}
type OrderModel = {
    created_date: Date;
    items: CartItem[];
    status: number;
}
type VisualizedData = {
    date?: Date;
    value?: number;
    amount?: number;
}

const apiCall = (type: string) => {

    return new Promise<VisualizedData[]>(async (resolve, reject) => {
        console.info('called')
        //API call
        const { data } = await Axios({
            baseURL: 'http://192.168.0.102:3000/api/v1',
            url: `admin/get-all-orders/${type}`,
            method: 'get'
        });
        const result: OrderModel[] = data.data.map((element: OrderModel) => {
            const newOrder: OrderModel = {
                created_date: new Date(element.created_date),
                items: element.items,
                status: element.status
            }
            return newOrder;
        })
        console.log(result);

        // const value = totalValue(result);
        // console.info('Total value: ', value);
        // const totalOrders = result.length + 0;
        // console.info('Total orders: ', totalOrders);
        // const successOrders = result.reduce((accu: number, element: OrderModel) => element.status === 1 ? ++accu : 0, 0);
        // console.info('Total Success: ', successOrders);
        // const dateArr = type === 'month' ? monthAgo() : weekAgo()
        // console.info(dateArr);

        const finalData = getFinalData(type === "month" ? monthAgo() : weekAgo(), result);
        resolve(finalData);

    });
}

const getFinalData = (dateArr: Date[], beforeData: OrderModel[]) => {
    //Filter data
    
    const afterData: VisualizedData[] = [];
    dateArr.forEach((element) => {
        //calculate value
        //get order with this date
        const thisDateOrders = beforeData.filter((order) => order.created_date.getDate() === element.getDate());
        const value = totalValue(thisDateOrders);
        console.log(element, value, thisDateOrders.length)
        const thisDateData: VisualizedData = {
            date: element,
            value: value,
            amount: thisDateOrders.length
        }
        afterData.push(thisDateData);
    });
    console.log('VisualizedData cuoi cung', afterData);
    return afterData;
}

const totalValue = (data: OrderModel[]): number => {
    return data.reduce((accu, element) => element.items.reduce((temp, item) => temp + item.item.price, 0) + accu, 0);
}

//return the array of dates
const weekAgo = () => {
    const today = new Date();
    const dateArr: Array<Date> = [];
    for (let i = 0; i < 7; i++) {
        if (i === 0) {
            dateArr.push(today);
        }
        else {
            dateArr.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i, 0, 0, 0, 0));
        }

    }
    console.info(dateArr);
    return dateArr
}

//return the array of dates
const monthAgo = () => {
    const today = new Date();
    const dateArr: Array<Date> = [];
    for (let i = 0; i < 30; i++) {
        if (i === 0) {
            dateArr.push(today);
        }
        else {
            dateArr.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i, 0, 0, 0, 0));
        }

    }
    console.info(dateArr);
    return dateArr
}

export default apiCall;