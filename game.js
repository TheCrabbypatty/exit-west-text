"use strict";
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_wrapFunction3 = f => function(p1, p2, p3) {
    return f(this, p1, p2, p3);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls[$rt_meta] && cls[$rt_meta].item) {
        ++arrayDegree;
        cls = cls[$rt_meta].item;
    }
    let clsName = "";
    if (cls[$rt_meta].primitiveKind !== 0) {
        clsName = cls[$rt_meta].name;
    } else {
        clsName = cls[$rt_meta] ? cls[$rt_meta].name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
},
$rt_meta = Symbol("teavm_meta"),
$rt_cls = cls => {
    if (cls[$rt_meta].classObject === null) {
        cls[$rt_meta].classObject = jl_Class_createClass(cls);
    }
    return cls[$rt_meta].classObject;
},
$rt_objcls = () => jl_Object,
$rt_newClassMetadata = source => {
    return Object.assign({ name: null, binaryName: null, parent: null, superinterfaces: [], modifiers: 0, primitiveKind: 0, itemType: null, arrayType: null, enclosingClass: null, declaringClass: null, simpleName: null, clinit: () => {
    }, constructor: null, enumConstants: () => null, resolvedEnumConstants: null, reflection: null, classObject: null, assignableCache: null, valueToObject: o => o, objectToValue: o => o }, source || {  });
},
$rt_createPrimitiveCls = (name, binaryName, kind, config) => {
    let cls = () => {
    };
    let meta = $rt_newClassMetadata({ name: name, binaryName: binaryName, modifiers: 1 | 1 << 4, primitiveKind: kind });
    cls[$rt_meta] = meta;
    if (typeof config === 'function') {
        config(meta);
    }
    return cls;
},
$rt_charcls = $rt_createPrimitiveCls("char", "C", 4, meta => {
}),
$rt_intcls = $rt_createPrimitiveCls("int", "I", 5, meta => {
}),
$rt_compare = (a, b) => a === b ? 0 : a < b ?  -1 : 1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_arraycls = cls => {
    let result = cls[$rt_meta].arrayType;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls[$rt_meta].binaryName;
        JavaArray[$rt_meta] = $rt_newClassMetadata({ name: name, binaryName: name, parent: $rt_objcls(), itemType: cls });
        result = JavaArray;
        cls[$rt_meta].arrayType = JavaArray;
    }
    return result;
};
function $rt_arrayLength(array) {
    return array.data.length;
}
let $rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    if (count <= 16) {
        for (let i = offset;i < limit;i = i + 1 | 0) {
            result += String.fromCharCode(array[i]);
        }
    } else {
        for (let i = offset;i < limit;i = i + 1024 | 0) {
            let next = Math.min(limit, i + 1024 | 0);
            result += String.fromCharCode.apply(null, array.subarray(i, next));
        }
    }
    return result;
},
$rt_str = str => str === null ? null : jl_String__init_0(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    if (!ex.$jsException) {
        $rt_fillNativeException(ex);
    }
    return ex.$jsException;
},
$rt_fillNativeException = ex => {
    let javaCause = $rt_throwableCause(ex);
    let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
    let cause = typeof jsCause === "object" ? { cause: jsCause } : void 0;
    let err = new JavaError("Java exception thrown", cause);
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(err);
    }
    err[$rt_javaExceptionProp] = ex;
    ex.$jsException = err;
    $rt_fillStack(err, ex);
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor: { configurable: true, writable: true, value: JavaError }, message: { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
                if (typeof javaMessage === "object") {
                    return javaMessage !== null ? javaMessage.toString() : null;
                }
            }
            return this[defaultMessage];
        } catch (e){
            return "Exception occurred trying to extract Java exception message: " + e;
        }
    } } });
} else {
    JavaError = Error;
}
let $rt_wrapException = err => {
    let ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
},
$rt_createException = message => jl_RuntimeException__init_1(message),
$rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => $rt_objcls(),
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return null;
    }
},
$rt_setStack = (e, stack) => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_allClasses = [],
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        $rt_allClasses.push(cls);
        let m = $rt_newClassMetadata();
        cls[$rt_meta] = m;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.parent = superclass !== 0 ? superclass : null;
        m.superinterfaces = data[i++];
        if (m.parent) {
            cls.prototype = Object.create(m.parent.prototype);
        } else {
            cls.prototype = {  };
        }
        cls.prototype.constructor = cls;
        m.modifiers = data[i++];
        m.primitiveKind = 0;
        if ((m.modifiers & 1 << 9) !== 0) {
            m.parent = null;
        }
        let innerClassInfo = data[i++];
        if (innerClassInfo !== 0) {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        m.clinit = clinit !== 0 ? () => {
            m.clinit = () => {
            };
            clinit();
        } : () => {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
    }
};
function jl_Object() {
    this.$id$ = 0;
}
let jl_Object__init_ = $this => {
    return;
},
jl_Object__init_0 = () => {
    let var_0 = new jl_Object();
    jl_Object__init_(var_0);
    return var_0;
},
jl_Object_getClass = $this => {
    return $rt_cls(jl_Object_getObjectClassInfo($this));
},
jl_Object_getObjectClassInfo = var$1 => {
    return var$1.constructor;
},
jl_Object_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_Class_getName(jl_Object_getClass($this));
    var$2 = jl_Integer_toHexString(jl_Object_identity($this));
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, var$1), 64), var$2);
    return jl_StringBuilder_toString(var$3);
},
jl_Object_identity = $this => {
    let $platformThis;
    $platformThis = $this;
    if (!$platformThis.$id$)
        $platformThis.$id$ = $rt_nextId();
    return $this.$id$;
};
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
    a.$suppressed = null;
}
let jl_Throwable__init_ = $this => {
    $this.$suppressed = $rt_createArray(jl_Throwable, 0);
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
},
jl_Throwable__init_1 = () => {
    let var_0 = new jl_Throwable();
    jl_Throwable__init_(var_0);
    return var_0;
},
jl_Throwable__init_0 = ($this, $message) => {
    $this.$suppressed = $rt_createArray(jl_Throwable, 0);
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
},
jl_Throwable__init_2 = var_0 => {
    let var_1 = new jl_Throwable();
    jl_Throwable__init_0(var_1, var_0);
    return var_1;
},
jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_getMessage = $this => {
    return $this.$message;
},
jl_Throwable_getCause = $this => {
    return $this.$cause === $this ? null : $this.$cause;
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_0 = $this => {
    jl_Throwable__init_($this);
},
jl_Exception__init_1 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_0(var_0);
    return var_0;
},
jl_Exception__init_ = ($this, $message) => {
    jl_Throwable__init_0($this, $message);
},
jl_Exception__init_2 = var_0 => {
    let var_1 = new jl_Exception();
    jl_Exception__init_(var_1, var_0);
    return var_1;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = $this => {
    jl_Exception__init_0($this);
},
jl_RuntimeException__init_2 = () => {
    let var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_0);
    return var_0;
},
jl_RuntimeException__init_0 = ($this, $message) => {
    jl_Exception__init_($this, $message);
},
jl_RuntimeException__init_1 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
jl_IndexOutOfBoundsException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_IndexOutOfBoundsException__init_0 = () => {
    let var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_(var_0);
    return var_0;
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf = ($array, $length) => {
    let var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createCharArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ji_Serializable = $rt_classWithoutFields(0),
jl_Number = $rt_classWithoutFields(),
jl_Comparable = $rt_classWithoutFields(0),
jl_Integer = $rt_classWithoutFields(jl_Number),
jl_Integer_TYPE = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer_toHexString = $i => {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
},
jl_Integer_parseInt0 = ($s, $radix) => {
    jl_Integer_$callClinit();
    if ($s === null)
        $rt_throw(jl_NumberFormatException__init_0($rt_s(0)));
    return jl_Integer_parseIntImpl($s, 0, jl_String_length($s), $radix);
},
jl_Integer_parseIntImpl = ($s, $beginIndex, $endIndex, $radix) => {
    let $negative, var$6, $value, $maxValue, var$9, $digit, var$11, var$12, var$13, var$14;
    jl_Integer_$callClinit();
    if ($beginIndex != $endIndex) {
        if ($radix >= 2 && $radix <= 36) {
            a: {
                b: {
                    c: {
                        $negative = 0;
                        switch ($s.$charAt($beginIndex)) {
                            case 43:
                                break c;
                            case 45:
                                break b;
                            default:
                        }
                        var$6 = $beginIndex;
                        break a;
                    }
                    var$6 = $beginIndex + 1 | 0;
                    break a;
                }
                $negative = 1;
                var$6 = $beginIndex + 1 | 0;
            }
            $value = 0;
            $maxValue = 1 + (2147483647 / $radix | 0) | 0;
            if (var$6 != $endIndex) {
                while (true) {
                    if (var$6 >= $endIndex) {
                        if ($negative)
                            $value =  -$value | 0;
                        return $value;
                    }
                    var$9 = var$6 + 1 | 0;
                    $digit = jl_Integer_decodeDigit($s.$charAt(var$6));
                    if ($digit < 0) {
                        var$11 = new jl_NumberFormatException;
                        var$12 = jl_String_valueOf($s.$subSequence($beginIndex, $endIndex));
                        var$13 = jl_StringBuilder__init_();
                        jl_StringBuilder_append(jl_StringBuilder_append(var$13, $rt_s(1)), var$12);
                        jl_NumberFormatException__init_(var$11, jl_StringBuilder_toString(var$13));
                        $rt_throw(var$11);
                    }
                    if ($digit >= $radix) {
                        var$12 = new jl_NumberFormatException;
                        var$13 = jl_String_valueOf($s.$subSequence($beginIndex, $endIndex));
                        var$14 = jl_StringBuilder__init_();
                        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$14, $rt_s(2)), $radix), $rt_s(3)), var$13);
                        jl_NumberFormatException__init_(var$12, jl_StringBuilder_toString(var$14));
                        $rt_throw(var$12);
                    }
                    if ($value > $maxValue)
                        break;
                    $value = $rt_imul($radix, $value) + $digit | 0;
                    if ($value < 0) {
                        if (var$9 == $endIndex && $value == (-2147483648) && $negative)
                            return (-2147483648);
                        var$11 = new jl_NumberFormatException;
                        var$12 = jl_String_valueOf($s.$subSequence($beginIndex, $endIndex));
                        var$13 = jl_StringBuilder__init_();
                        jl_StringBuilder_append(jl_StringBuilder_append(var$13, $rt_s(4)), var$12);
                        jl_NumberFormatException__init_(var$11, jl_StringBuilder_toString(var$13));
                        $rt_throw(var$11);
                    }
                    var$6 = var$9;
                }
                $rt_throw(jl_NumberFormatException__init_0($rt_s(5)));
            }
            $rt_throw(jl_NumberFormatException__init_2());
        }
        var$11 = new jl_NumberFormatException;
        var$12 = jl_StringBuilder__init_();
        jl_StringBuilder_append1(jl_StringBuilder_append(var$12, $rt_s(6)), $radix);
        jl_NumberFormatException__init_(var$11, jl_StringBuilder_toString(var$12));
        $rt_throw(var$11);
    }
    $rt_throw(jl_NumberFormatException__init_0($rt_s(7)));
},
jl_Integer_parseInt = $s => {
    jl_Integer_$callClinit();
    return jl_Integer_parseInt0($s, 10);
},
jl_Integer_decodeDigit = $c => {
    jl_Integer_$callClinit();
    if ($c >= 48 && $c <= 57)
        return $c - 48 | 0;
    if ($c >= 97 && $c <= 122)
        return ($c - 97 | 0) + 10 | 0;
    if ($c >= 65 && $c <= 90)
        return ($c - 65 | 0) + 10 | 0;
    return (-1);
},
jl_Integer_numberOfLeadingZeros = $i => {
    let $n, var$3, var$4;
    jl_Integer_$callClinit();
    if ($i) {
        $n = 0;
        var$3 = $i >>> 16 | 0;
        if (var$3)
            $n = 16;
        else
            var$3 = $i;
        var$4 = var$3 >>> 8 | 0;
        if (!var$4)
            var$4 = var$3;
        else
            $n = $n | 8;
        var$3 = var$4 >>> 4 | 0;
        if (!var$3)
            var$3 = var$4;
        else
            $n = $n | 4;
        var$4 = var$3 >>> 2 | 0;
        if (!var$4)
            var$4 = var$3;
        else
            $n = $n | 2;
        if (var$4 >>> 1 | 0)
            $n = $n | 1;
        return (32 - $n | 0) - 1 | 0;
    }
    return 32;
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
otji_JSWrapper = $rt_classWithoutFields(),
otp_Platform = $rt_classWithoutFields(),
jl_Character = $rt_classWithoutFields(),
jl_Character_TYPE = null,
jl_Character_characterCache = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character_forDigit = ($digit, $radix) => {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
},
otci_IntegerUtil = $rt_classWithoutFields(),
otci_IntegerUtil_toUnsignedLogRadixString = ($value, $radixLog2) => {
    let $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if ($value) {
        $radix = 1 << $radixLog2;
        $mask = $radix - 1 | 0;
        $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
        $chars = $rt_createCharArray($sz);
        $pos = $rt_imul($sz - 1 | 0, $radixLog2);
        $target = 0;
        while ($pos >= 0) {
            var$9 = $chars.data;
            $target_0 = $target + 1 | 0;
            var$9[$target] = jl_Character_forDigit(($value >>> $pos | 0) & $mask, $radix);
            $pos = $pos - $radixLog2 | 0;
            $target = $target_0;
        }
        return jl_String__init_5($chars);
    }
    return $rt_s(8);
},
jl_CharSequence = $rt_classWithoutFields(0);
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_($this, 16);
},
jl_AbstractStringBuilder__init_2 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_ = ($this, $capacity) => {
    jl_Object__init_($this);
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_1 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append1 = ($this, $obj) => {
    return $this.$insert($this.$length0, $obj);
},
jl_AbstractStringBuilder_insert = ($this, $index, $string) => {
    let $i, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(9);
        else if (jl_String_isEmpty($string))
            return $this;
        $this.$ensureCapacity($this.$length0 + jl_String_length($string) | 0);
        $i = $this.$length0 - 1 | 0;
        while ($i >= $index) {
            $this.$buffer.data[$i + jl_String_length($string) | 0] = $this.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + jl_String_length($string) | 0;
        $i = 0;
        while ($i < jl_String_length($string)) {
            var$4 = $this.$buffer.data;
            var$5 = $index + 1 | 0;
            var$4[$index] = jl_String_charAt($string, $i);
            $i = $i + 1 | 0;
            $index = var$5;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_append0 = ($this, $value) => {
    return $this.$append2($value, 10);
},
jl_AbstractStringBuilder_append2 = ($this, $value, $radix) => {
    return $this.$insert0($this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert2 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, $radix) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = $rt_udiv((-1), $radix);
            b: {
                c: {
                    while (true) {
                        var$10 = $rt_imul($pos, $radix);
                        if ($rt_ucmp(var$10, $value) > 0)
                            break c;
                        $sz = $sz + 1 | 0;
                        if ($rt_ucmp(var$10, $posLimit) > 0)
                            break;
                        $pos = var$10;
                    }
                    break b;
                }
                var$10 = $pos;
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                var$11 = $target;
            else {
                var$5 = $this.$buffer.data;
                var$11 = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (!var$10)
                    break a;
                var$5 = $this.$buffer.data;
                var$6 = var$11 + 1 | 0;
                var$5[var$11] = jl_Character_forDigit($rt_udiv($value, var$10), $radix);
                $value = $rt_umod($value, var$10);
                var$10 = $rt_udiv(var$10, $radix);
                var$11 = var$6;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_append = ($this, $c) => {
    return $this.$insert1($this.$length0, $c);
},
jl_AbstractStringBuilder_insert1 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
},
jl_AbstractStringBuilder_insert0 = ($this, $index, $obj) => {
    return $this.$insert2($index, $obj === null ? $rt_s(9) : $obj.$toString());
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let $newLength;
    if ($this.$buffer.data.length < $capacity) {
        $newLength = $this.$buffer.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer.data.length * 2 | 0, 5));
        $this.$buffer = ju_Arrays_copyOf($this.$buffer, $newLength);
        return;
    }
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_4($this.$buffer, 0, $this.$length0);
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let $sz, $i;
    $sz = $this.$length0 - $start | 0;
    $this.$ensureCapacity(($this.$length0 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        $this.$buffer.data[$end + $i | 0] = $this.$buffer.data[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
},
otrr_ReflectionInfo = $rt_classWithoutFields(),
otr_StringInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
jl_Math = $rt_classWithoutFields(),
jl_Math_min = ($a, $b) => {
    if ($a < $b)
        $b = $a;
    return $b;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
jl_String = $rt_classWithoutFields(),
jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_2 = $this => {
    jl_String_$callClinit();
    jl_Object__init_($this);
    $this.$nativeString = "";
},
jl_String__init_6 = () => {
    let var_0 = new jl_String();
    jl_String__init_2(var_0);
    return var_0;
},
jl_String__init_ = ($this, $characters) => {
    let var$2;
    jl_String_$callClinit();
    var$2 = $characters.data;
    jl_Object__init_($this);
    $this.$nativeString = $rt_charArrayToString($characters.data, 0, var$2.length);
},
jl_String__init_5 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_(var_1, var_0);
    return var_1;
},
jl_String__init_1 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_0 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_1(var_1, var_0);
    return var_1;
},
jl_String__init_3 = (var$0, var$1, $offset, $count) => {
    let var$4;
    jl_String_$callClinit();
    var$4 = var$1.data;
    jl_Object__init_(var$0);
    ju_Objects_checkFromIndexSize($offset, $count, var$4.length);
    var$0.$nativeString = $rt_charArrayToString(var$1.data, $offset, $count);
},
jl_String__init_4 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_3(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_charAt = ($this, $index) => {
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_String_length = $this => {
    return $this.$nativeString.length;
},
jl_String_isEmpty = $this => {
    return $this.$nativeString.length ? 0 : 1;
},
jl_String_substring = ($this, $beginIndex, $endIndex) => {
    let $length, var$4;
    $length = $this.$nativeString.length;
    var$4 = $rt_compare($beginIndex, $endIndex);
    if (var$4) {
        if (!$beginIndex && $endIndex == $length)
            return $this;
        if ($beginIndex >= 0 && var$4 <= 0 && $endIndex <= $length)
            return jl_String__init_0($this.$nativeString.substring($beginIndex, $endIndex));
        $rt_throw(jl_StringIndexOutOfBoundsException__init_());
    }
    return jl_String_EMPTY;
},
jl_String_subSequence = ($this, $beginIndex, $endIndex) => {
    return jl_String_substring($this, $beginIndex, $endIndex);
},
jl_String_trim = $this => {
    let $lower, $upper;
    $lower = 0;
    $upper = jl_String_length($this) - 1 | 0;
    a: {
        b: {
            while ($lower <= $upper) {
                if ($this.$nativeString.charCodeAt($lower) > 32)
                    break b;
                $lower = $lower + 1 | 0;
            }
            break a;
        }
    }
    while ($lower <= $upper && $this.$nativeString.charCodeAt($upper) <= 32) {
        $upper = $upper + (-1) | 0;
    }
    return jl_String_substring($this, $lower, $upper + 1 | 0);
},
jl_String_toString = $this => {
    return $this;
},
jl_String_valueOf = $obj => {
    jl_String_$callClinit();
    return $obj === null ? $rt_s(9) : $obj.$toString();
},
jl_String__clinit_ = () => {
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    jl_String_EMPTY = jl_String__init_6();
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_118_0__init_0();
},
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_GenericDeclaration = $rt_classWithoutFields(0),
otji_JS = $rt_classWithoutFields(),
jl_Appendable = $rt_classWithoutFields(0),
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
jl_StringIndexOutOfBoundsException__init_0 = $this => {
    jl_IndexOutOfBoundsException__init_($this);
},
jl_StringIndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
},
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
let jl_IllegalArgumentException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalArgumentException__init_2 = () => {
    let var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_(var_0);
    return var_0;
},
jl_IllegalArgumentException__init_0 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IllegalArgumentException__init_1 = var_0 => {
    let var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_0(var_1, var_0);
    return var_1;
},
jl_NumberFormatException = $rt_classWithoutFields(jl_IllegalArgumentException),
jl_NumberFormatException__init_1 = $this => {
    jl_IllegalArgumentException__init_($this);
},
jl_NumberFormatException__init_2 = () => {
    let var_0 = new jl_NumberFormatException();
    jl_NumberFormatException__init_1(var_0);
    return var_0;
},
jl_NumberFormatException__init_ = ($this, $message) => {
    jl_IllegalArgumentException__init_0($this, $message);
},
jl_NumberFormatException__init_0 = var_0 => {
    let var_1 = new jl_NumberFormatException();
    jl_NumberFormatException__init_(var_1, var_0);
    return var_1;
},
GameModule = $rt_classWithoutFields(),
GameModule_GAME = null,
GameModule_$callClinit = () => {
    GameModule_$callClinit = $rt_eraseClinit(GameModule);
    GameModule__clinit_();
},
GameModule_getIntro = () => {
    GameModule_$callClinit();
    return GameModule_GAME.$getIntro();
},
GameModule_respond = $input => {
    GameModule_$callClinit();
    return GameModule_GAME.$respond($input);
},
GameModule__clinit_ = () => {
    GameModule_GAME = Game__init_0();
},
GameModule_getIntro$exported$0 = () => {
    GameModule_$callClinit();
    return $rt_ustr(GameModule_getIntro());
},
GameModule_respond$exported$1 = var$1 => {
    GameModule_$callClinit();
    return $rt_ustr(GameModule_respond($rt_str(var$1)));
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_checkFromIndexSize = ($fromIndex, $size, $length) => {
    if ($fromIndex >= 0 && $size >= 0 && $size <= ($length - $fromIndex | 0))
        return $fromIndex;
    $rt_throw(jl_IndexOutOfBoundsException__init_0());
},
Game = $rt_classWithoutFields(),
Game__init_ = $this => {
    jl_Object__init_($this);
},
Game__init_0 = () => {
    let var_0 = new Game();
    Game__init_(var_0);
    return var_0;
},
Game_getIntro = $this => {
    return $rt_s(10);
},
Game_respond = ($this, $input) => {
    let $choice, $$je;
    a: {
        try {
            $choice = jl_Integer_parseInt(jl_String_trim($input));
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
            } else {
                throw $$e;
            }
        }
        return $rt_s(11);
    }
    if ($choice == 1)
        return $rt_s(12);
    return $rt_s(13);
},
jlr_Type = $rt_classWithoutFields(0),
otrr_ClassInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
ju_Comparator = $rt_classWithoutFields(0),
jl_String$_clinit_$lambda$_118_0 = $rt_classWithoutFields(),
jl_String$_clinit_$lambda$_118_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jl_String$_clinit_$lambda$_118_0__init_0 = () => {
    let var_0 = new jl_String$_clinit_$lambda$_118_0();
    jl_String$_clinit_$lambda$_118_0__init_(var_0);
    return var_0;
};
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$flags = 0;
    a.$classInfo = null;
    a.$name = null;
}
let jl_Class__init_0 = ($this, $classInfo) => {
    jl_Object__init_($this);
    $this.$classInfo = $classInfo;
},
jl_Class__init_ = var_0 => {
    let var_1 = new jl_Class();
    jl_Class__init_0(var_1, var_0);
    return var_1;
},
jl_Class_createClass = $classInfo => {
    return jl_Class__init_($classInfo);
},
jl_Class_getName = $this => {
    let $metadataName, $result, $itemType, $itemName, var$5;
    if (!($this.$flags & 1)) {
        $this.$flags = $this.$flags | 1;
        $metadataName = $this.$classInfo[$rt_meta].name;
        $result = $metadataName === null ? null : $rt_str($metadataName);
        if ($result === null) {
            $itemType = $this.$classInfo[$rt_meta].itemType;
            if ($itemType !== null) {
                $itemName = jl_Class_getName($rt_cls($itemType));
                if ($itemName !== null) {
                    if ($itemType[$rt_meta].itemType !== null) {
                        var$5 = jl_StringBuilder__init_();
                        jl_StringBuilder_append(jl_StringBuilder_append0(var$5, 91), $itemName);
                        $result = jl_StringBuilder_toString(var$5);
                    } else {
                        var$5 = jl_StringBuilder__init_();
                        jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append(var$5, $rt_s(14)), $itemName), 59);
                        $result = jl_StringBuilder_toString(var$5);
                    }
                }
            }
        }
        $this.$name = $result;
    }
    return $this.$name;
},
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_0($this);
},
jl_StringBuilder__init_ = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
},
jl_StringBuilder_append = ($this, $obj) => {
    jl_AbstractStringBuilder_append1($this, $obj);
    return $this;
},
jl_StringBuilder_append1 = ($this, $value) => {
    jl_AbstractStringBuilder_append0($this, $value);
    return $this;
},
jl_StringBuilder_append0 = ($this, $c) => {
    jl_AbstractStringBuilder_append($this, $c);
    return $this;
},
jl_StringBuilder_insert = ($this, $index, $obj) => {
    jl_AbstractStringBuilder_insert0($this, $index, $obj);
    return $this;
},
jl_StringBuilder_insert2 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insert1($this, $index, $c);
    return $this;
},
jl_StringBuilder_insert1 = ($this, $index, $string) => {
    jl_AbstractStringBuilder_insert($this, $index, $string);
    return $this;
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert3 = ($this, var$1, var$2) => {
    return $this.$insert3(var$1, var$2);
},
jl_StringBuilder_insert0 = ($this, var$1, var$2) => {
    return $this.$insert4(var$1, var$2);
},
jl_StringBuilder_insert4 = ($this, var$1, var$2) => {
    return $this.$insert5(var$1, var$2);
};
$rt_packages([-1, "java", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 1, 0, [], 1, 0, 0, ["$getClass", $rt_wrapFunction0(jl_Object_getClass), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity)],
jl_Throwable, 0, jl_Object, [], 1, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace), "$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage), "$getCause", $rt_wrapFunction0(jl_Throwable_getCause)],
jl_Exception, 0, jl_Throwable, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Exception__init_0), "$_init_0", $rt_wrapFunction1(jl_Exception__init_)],
jl_RuntimeException, 0, jl_Exception, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_RuntimeException__init_), "$_init_0", $rt_wrapFunction1(jl_RuntimeException__init_0)],
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_)],
ju_Arrays, 0, jl_Object, [], 1, 0, 0, 0,
ji_Serializable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1025, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 1, 0, () => jl_Integer_$callClinit(), 0,
jl_ClassCastException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
otji_JSWrapper, 0, jl_Object, [], 17, 0, 0, 0,
otp_Platform, 0, jl_Object, [], 17, 0, 0, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 1, 0, () => jl_Character_$callClinit(), 0,
otci_IntegerUtil, 0, jl_Object, [], 17, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 1537, 0, 0, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_2", $rt_wrapFunction1(jl_AbstractStringBuilder__init_), "$append3", $rt_wrapFunction1(jl_AbstractStringBuilder_append1), "$insert2", $rt_wrapFunction2(jl_AbstractStringBuilder_insert), "$append4", $rt_wrapFunction1(jl_AbstractStringBuilder_append0), "$append2", $rt_wrapFunction2(jl_AbstractStringBuilder_append2), "$insert0", $rt_wrapFunction3(jl_AbstractStringBuilder_insert2),
"$append5", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$insert1", $rt_wrapFunction2(jl_AbstractStringBuilder_insert1), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert0), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
otrr_ReflectionInfo, 0, jl_Object, [], 1025, 0, 0, 0,
otr_StringInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
jl_Math, 0, jl_Object, [], 17, 0, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 17, 0, () => jl_String_$callClinit(), ["$_init_", $rt_wrapFunction0(jl_String__init_2), "$_init_1", $rt_wrapFunction1(jl_String__init_), "$_init_4", $rt_wrapFunction1(jl_String__init_1), "$_init_3", $rt_wrapFunction3(jl_String__init_3), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length", $rt_wrapFunction0(jl_String_length), "$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$substring", $rt_wrapFunction2(jl_String_substring),
"$subSequence", $rt_wrapFunction2(jl_String_subSequence), "$trim", $rt_wrapFunction0(jl_String_trim), "$toString", $rt_wrapFunction0(jl_String_toString)],
jlr_AnnotatedElement, 0, jl_Object, [], 1537, 0, 0, 0,
jlr_GenericDeclaration, 0, jl_Object, [jlr_AnnotatedElement], 1537, 0, 0, 0,
otji_JS, 0, jl_Object, [], 17, 0, 0, 0,
jl_Appendable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_0)],
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalArgumentException__init_), "$_init_0", $rt_wrapFunction1(jl_IllegalArgumentException__init_0)],
jl_NumberFormatException, 0, jl_IllegalArgumentException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_NumberFormatException__init_1), "$_init_0", $rt_wrapFunction1(jl_NumberFormatException__init_)],
GameModule, 0, jl_Object, [], 1, 0, () => GameModule_$callClinit(), 0,
ju_Objects, 0, jl_Object, [], 17, 0, 0, 0,
Game, 0, jl_Object, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(Game__init_), "$getIntro", $rt_wrapFunction0(Game_getIntro), "$respond", $rt_wrapFunction1(Game_respond)],
jlr_Type, 0, jl_Object, [], 1537, 0, 0, 0,
otrr_ClassInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
ju_Comparator, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String$_clinit_$lambda$_118_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_String$_clinit_$lambda$_118_0__init_)],
jl_Class, 0, jl_Object, [jlr_GenericDeclaration, jlr_Type], 17, 0, 0, ["$getName", $rt_wrapFunction0(jl_Class_getName)],
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringBuilder__init_0), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$append1", $rt_wrapFunction1(jl_StringBuilder_append1), "$append0", $rt_wrapFunction1(jl_StringBuilder_append0), "$insert3", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert4", $rt_wrapFunction2(jl_StringBuilder_insert2), "$insert5", $rt_wrapFunction2(jl_StringBuilder_insert1), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString),
"$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert3), "$insert1", $rt_wrapFunction2(jl_StringBuilder_insert0), "$insert2", $rt_wrapFunction2(jl_StringBuilder_insert4)]]);
let $rt_charArrayCls = $rt_arraycls($rt_charcls);
$rt_stringPool(["String is null", "String contains invalid digits: ", "String contains digits out of radix ", ": ", "The value is too big for int type: ", "The value is too big for integer type", "Illegal radix: ", "String is empty", "0", "null", "In this choose your own adventure, you take the place of Saeed and will choose his choices at various times throughout the book, by entering 1 or 2.\nAfter hearing that your father has chosen to stay in the city as to not leave the place he has lived his entire life with your mother. You have the choice to either continue on your plan to leave the city and go through the door with Nadia or to stay with your father. What do you do? (1 or 2)",
"Please enter 1 or 2.", "You choose to continue on with your plan to go through the door with Nadia. When you go through the door, you arrive in Mykonos and begin living in the refugee camp there. Eventually, you take another door to London, and begin living in an abandoned large mansion with dozens of other refugees from around the world.", "You choose to abandon your plan with Nadia and stay with your father. Nadia is angry with you, but has to leave quickly in order to meet up with the agent. You spend the next few months with your father, always in fear of the militants deciding to kill you, or of the fighting starting up again. After a few months, your father contracts pneumonia and dies, leaving you alone. You begin having doubts about not going with Nadia when you had the chance, and imagine how life would be if you had chosen to go.",
"[L"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
let $rt_jso_marker = Symbol('jsoClass');
(() => {
    let c;
})();
export { GameModule_getIntro$exported$0 as getIntro, GameModule_respond$exported$1 as respond };
