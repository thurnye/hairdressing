import services from '../util/services'



//Get Products
export const getProducts = async (page:number, itemPerPage:number) => {
    try{
        const products:any = await services.find(page, itemPerPage)
        
        return products;

    }catch(err){
        return err;
    }
}