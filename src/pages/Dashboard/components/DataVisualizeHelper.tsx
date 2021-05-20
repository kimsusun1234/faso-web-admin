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
    success?: number;
    status?: string;
    totalOrder?: number;
}

const getOrderChartData = (type: string) => {

    return new Promise<VisualizedData[]>(async (resolve, reject) => {
        console.info('called')
        //API call
        const { data } = await Axios({
            baseURL: 'http://3.136.161.133:3000/api/v1',
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
        const success = totalSuccess(thisDateOrders);
        const thisDateData: VisualizedData = {
            date: element,
            value: value,
            amount: thisDateOrders.length,
            success: success
        }
        afterData.push(thisDateData);
    });
    return afterData;
}

const totalValue = (data: OrderModel[]): number => {
    return data.reduce((accu, element) => element.items.reduce((temp, item) => temp + item.item.price, 0) + accu, 0);
}

const totalSuccess = (data: OrderModel[]): number => {

    return data.filter((element) => element.status === 3).length;
}

//return the array of dates
const weekAgo = () => {
    const today = new Date();
    const dateArr: Array<Date> = [];
    for (let i = 6; i > -1; --i) {
        if (i === 0) {
            dateArr.push(today);
        }
        else {
            dateArr.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i, 0, 0, 0, 0));
        }

    }
    return dateArr
}

//return the array of dates
const monthAgo = () => {
    const today = new Date();
    const dateArr: Array<Date> = [];
    for (let i = 29; i > -1; --i) {
        if (i === 0) {
            dateArr.push(today);
        }
        else {
            dateArr.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i, 0, 0, 0, 0));
        }

    }
    return dateArr
}

const getStatusOrderChartData = (type: string) => {
    return new Promise<VisualizedData[]>(async (resolve, reject) => {
        console.info('called')
        //API call
        const { data } = await Axios({
            baseURL: 'http://3.136.161.133:3000/api/v1',
            url: `admin/get-status-orders/${type}`,
            method: 'get'
        });

        //reformat the data with JS Date
        const result: OrderModel[] = data.data.map((element: OrderModel) => {
            const newOrder: OrderModel = {
                created_date: new Date(element.created_date),
                items: element.items,
                status: element.status
            }
            return newOrder;
        })

        // const value = totalValue(result);
        // console.info('Total value: ', value);
        // const totalOrders = result.length + 0;
        // console.info('Total orders: ', totalOrders);
        // const successOrders = result.reduce((accu: number, element: OrderModel) => element.status === 1 ? ++accu : 0, 0);
        // console.info('Total Success: ', successOrders);
        // const dateArr = type === 'month' ? monthAgo() : weekAgo()
        // console.info(dateArr);

        const finalData = getFinalStatusData(type === "month" ? monthAgo() : weekAgo(), result);
        console.log('last reulst', finalData)
        resolve(finalData);

    });
}

const getFinalStatusData = (dateArr: Date[], data: OrderModel[]) => {
    const successData: VisualizedData[] = [];
    const failedData: VisualizedData[] = [];
    dateArr.forEach((element) => {
        //calculate value
        //get order with this date
        // const thisDateOrders = beforeData.filter((order) => order.created_date.getDate() === element.getDate());
        // const value = totalValue(thisDateOrders);
        // const success = totalSuccess(thisDateOrders);
        // const thisDateData: VisualizedData = {
        //     date: element,
        //     value: value,
        //     amount: thisDateOrders.length,
        //     success: success
        // }
        // afterData.push(thisDateData);
        const thisDateSuccessOrder = data.filter((order) => order.created_date.getDate() === element.getDate() && order.status === 3);
        const thisDateFailedOrder = data.filter((order) => order.created_date.getDate() === element.getDate() && order.status === 4);
        const successValue = totalValue(thisDateSuccessOrder);
        const failedValue = totalValue(thisDateFailedOrder);
        const thisDateSuccessData: VisualizedData = {
            date: element,
            value: successValue,
            amount: thisDateSuccessOrder.length,
            status: 'Success',
            totalOrder: data.length
        }
        const thisDateFailedData: VisualizedData = {
            date: element,
            value: failedValue,
            amount: thisDateFailedOrder.length,
            status: 'Failed',
            totalOrder: data.length
        }
        successData.push(thisDateSuccessData);
        failedData.push(thisDateFailedData);

    });
    return successData.concat(failedData);
}

export {getOrderChartData, getStatusOrderChartData};