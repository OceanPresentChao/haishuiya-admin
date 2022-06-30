import type { FormRules } from "element-plus";

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
    /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

/** 登陆校验 */
export const loginRules = reactive(<FormRules>{
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    password: [
        {
            validator: (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else if (!REGEXP_PWD.test(value)) {
                    callback(
                        new Error("密码格式应为8-18位数字、字母、符号的任意两种组合")
                    );
                } else {
                    callback();
                }
            },
            trigger: "blur"
        }
    ]
});