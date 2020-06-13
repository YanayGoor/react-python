export const setCurrentPackage = (env, name) => {
    env.setdefault('__name__', name)
    env.setdefault('__package__', name)
}

export const setPackages = (env, packages) => {
    const setModule = window.pyodide.runPython('import sys \nsys.modules.setdefault', env)
    Object.entries(packages).forEach(
        ([name, p]) => {
            setModule(name, p)
        }
    )
}

export const executeFile = (pythonCode, pyImports, pyPromises) => {
    return Promise.all([window.languagePluginLoader, ...pyPromises]).then(() => {
        const env = window.pyodide.newEnv();
        setCurrentPackage(env, 'pythonreact')
        setPackages(env, pyImports)
        window.pyodide.runPython(pythonCode)
    })
}