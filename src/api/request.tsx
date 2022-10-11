import services from '../util/services'



//Get Products
export const getProducts = async (page:number, itemPerPage:number, category:string) => {
    try{
        const products:any = await services.find(page, itemPerPage, category)
        
        return products;

    }catch(err){
        return err;
    }
}
//Get Categories
export const getCategories = async () => {
    try{
        const categories:any = await services.getCategories()
        
        return categories;

    }catch(err){
        return err;
    }
}