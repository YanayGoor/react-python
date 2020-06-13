export const setCurrentPackage = (env, name) => {
    env.setdefault('__name__', name)
    env.setdefault('__package__', name)
}

export const setPackages = (env, packages) => {
    window.pyodide.runPython('import sys', env)
    Object.entries(packages).forEach(
        ([name, p]) => {
            window.pyodide.pyimport('print')(env.get('sys'))
            env.get('sys').setdefault(name, p)
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