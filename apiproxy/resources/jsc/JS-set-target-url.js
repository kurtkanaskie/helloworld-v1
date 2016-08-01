if (context.flow=="TARGET_REQ_FLOW") {
    var suffix = context.getVariable("sage.target.pathsuffix");
    print ("suffix ", suffix);
    var basepath = context.getVariable("target.basepath");
    print ("basepath ", basepath);

    context.setVariable("target.basepath", basepath + suffix);
    context.setVariable("debug.target.basepath", basepath + suffix);
}