/*
 * @Author: maggot-code
 * @Date: 2022-02-22 15:50:29
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-02-23 14:55:34
 * @Description: file content
 * 
    import { useAxios } from 'biz/axios';
    import { EXAMPLE_API } from 'svc/http';

    export default useAxios({
        ...EXAMPLE_API
    }); 
 */

import { useAxios } from 'biz/axios';
import { EXAMPLE_API } from 'svc/http';

export default useAxios({
    ...EXAMPLE_API
}); 